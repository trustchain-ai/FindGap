#!/usr/bin/env bash
#
# scripts/api-push.sh — 通过 GitHub Git Data API 推送本地提交，绕过 `git push`
#
# 用途：当 `git push` 在沙箱 / 受限环境 / 网络代理下被 SIGKILL（exit 137）
# 或挂起时，使用 REST API 逐文件上传 blob → 构造 tree → 创建 commit → 更新 ref。
# 整个流程每次只上传单个文件（base64），不触发 git pack 的内存峰值。
#
# 前置条件：
#   - gh CLI 已登录（gh auth status 显示 ✓）
#   - 当前 HEAD 是一个普通 commit（非 merge），且其 parent 已在远程存在
#   - 仅处理 add/modify；如有 delete 文件需手工扩展（见末尾 NOTES）
#
# 用法：
#   ./scripts/api-push.sh                  # 推送 HEAD 到远程同名分支
#   ./scripts/api-push.sh feat/my-branch   # 推送 HEAD 到指定远程分支（首次创建/快进）
#   REPO=org/name ./scripts/api-push.sh    # 覆盖远程 repo
#
# 退出码：
#   0 = 成功；非 0 = 各步骤的失败原因（见 stderr）
#
# 学术对照：本脚本是对 ec5d2cb→2061e03 推送（v0.4 发布）的固化产物——见
# CHANGELOG v0.4 + dogfood/runs/002 的 "Push 受沙箱限制" 段。

set -euo pipefail

# ─────────────────────────── 配置 ───────────────────────────
REPO="${REPO:-$(gh repo view --json nameWithOwner --jq '.nameWithOwner' 2>/dev/null || true)}"
[[ -n "$REPO" ]] || { echo "ERR: REPO not detected. Set REPO=org/name or run inside a gh-aware repo." >&2; exit 1; }

REMOTE_BRANCH="${1:-$(git symbolic-ref --short HEAD)}"
HEAD_SHA=$(git rev-parse HEAD)

echo "→ repo=$REPO branch=$REMOTE_BRANCH head=$HEAD_SHA"

# ─────────────────────────── 确定 parent ───────────────────────────
# 远程是否已有该分支？有 → 取其当前 sha 作 parent + base_tree
if PARENT_SHA=$(gh api "repos/$REPO/git/ref/heads/$REMOTE_BRANCH" --jq '.object.sha' 2>/dev/null); then
  echo "→ remote branch exists, parent=$PARENT_SHA"
  CREATE_REF=0
else
  # 取本地 HEAD 的第一个父，且该父必须已在远程存在
  PARENT_SHA=$(git rev-parse 'HEAD^')
  if ! gh api "repos/$REPO/git/commits/$PARENT_SHA" --jq '.sha' >/dev/null 2>&1; then
    echo "ERR: parent commit $PARENT_SHA not on remote. Push ancestors first or use an existing branch." >&2
    exit 2
  fi
  echo "→ remote branch absent, will create at parent=$PARENT_SHA"
  CREATE_REF=1
fi

# 本地 HEAD 不应等于 parent（否则没东西可推）
if [[ "$HEAD_SHA" == "$PARENT_SHA" ]]; then
  echo "✓ already up to date (HEAD == parent)"
  exit 0
fi

# ─────────────────────────── 收集变更文件 ───────────────────────────
# 用 -z 处理 unicode / 含空格的路径（关键：避免中文文件名八进制转义）
# 不用 mapfile —— macOS 自带 bash 3.2 无该内建。手动 read NUL-delimited。
DEL_FOUND=0
ADD_PATHS=()
state=status   # 状态机：交替读取 status / path
cur_status=""
while IFS= read -r -d '' tok; do
  if [[ "$state" == "status" ]]; then
    cur_status="$tok"
    state=path
  else
    p="$tok"
    case "$cur_status" in
      A|M|T) ADD_PATHS+=("$p") ;;
      D)     DEL_FOUND=1
             echo "WARN: file deletion not supported by this script: $p" >&2 ;;
      R*|C*) echo "ERR: rename/copy not supported (status=$cur_status path=$p). Split into delete+add." >&2; exit 3 ;;
      *)     echo "ERR: unknown status '$cur_status' for $p" >&2; exit 3 ;;
    esac
    state=status
  fi
done < <(git diff --name-status -z "$PARENT_SHA" HEAD)

[[ $DEL_FOUND -eq 1 ]] && { echo "ERR: deletions detected; aborting to avoid data loss. Handle manually." >&2; exit 4; }
[[ ${#ADD_PATHS[@]} -gt 0 ]] || { echo "ERR: no files changed between $PARENT_SHA and HEAD" >&2; exit 5; }

echo "→ ${#ADD_PATHS[@]} files to upload"

# ─────────────────────────── 取 base_tree ───────────────────────────
BASE_TREE=$(gh api "repos/$REPO/git/commits/$PARENT_SHA" --jq '.tree.sha')
echo "→ base_tree=$BASE_TREE"

# ─────────────────────────── 上传每个 blob ───────────────────────────
TSV=$(mktemp -t api-push-blobs.XXXXXX)
trap 'rm -f "$TSV"' EXIT

for p in "${ADD_PATHS[@]}"; do
  [[ -f "$p" ]] || { echo "ERR: file missing in working tree: $p" >&2; exit 6; }
  b64=$(base64 -i "$p" | tr -d '\n')
  blob_sha=$(jq -n --arg c "$b64" '{content:$c, encoding:"base64"}' \
    | gh api -X POST "repos/$REPO/git/blobs" --input - --jq '.sha')
  printf '%s\t%s\n' "$p" "$blob_sha" >> "$TSV"
  echo "  blob $p → $blob_sha"
done

# ─────────────────────────── 构造 tree ───────────────────────────
TREE_PATCH=$(jq -Rs 'split("\n") | map(select(length>0) | split("\t") | {path:.[0], mode:"100644", type:"blob", sha:.[1]})' "$TSV")
NEW_TREE=$(jq -n --arg base "$BASE_TREE" --argjson tree "$TREE_PATCH" \
  '{base_tree:$base, tree:$tree}' \
  | gh api -X POST "repos/$REPO/git/trees" --input - --jq '.sha')
echo "→ new_tree=$NEW_TREE"

# ─────────────────────────── 创建 commit ───────────────────────────
# 复用本地 commit message（保留多行 / 中文 / co-authored-by 等）
MSG=$(git log -1 --pretty=%B HEAD)
NEW_COMMIT=$(jq -n --arg m "$MSG" --arg t "$NEW_TREE" --arg p "$PARENT_SHA" \
  '{message:$m, tree:$t, parents:[$p]}' \
  | gh api -X POST "repos/$REPO/git/commits" --input - --jq '.sha')
echo "→ new_commit=$NEW_COMMIT"

# ─────────────────────────── 更新 ref ───────────────────────────
if [[ $CREATE_REF -eq 1 ]]; then
  jq -n --arg s "$NEW_COMMIT" --arg r "refs/heads/$REMOTE_BRANCH" \
    '{ref:$r, sha:$s}' \
    | gh api -X POST "repos/$REPO/git/refs" --input - --jq '.object.sha' >/dev/null
  echo "✓ created refs/heads/$REMOTE_BRANCH → $NEW_COMMIT"
else
  jq -n --arg s "$NEW_COMMIT" '{sha:$s, force:false}' \
    | gh api -X PATCH "repos/$REPO/git/refs/heads/$REMOTE_BRANCH" --input - --jq '.object.sha' >/dev/null
  echo "✓ fast-forwarded refs/heads/$REMOTE_BRANCH → $NEW_COMMIT"
fi

# ─────────────────────────── 对齐本地 ───────────────────────────
# API 创建的 commit 与本地 HEAD tree 相同但 sha 不同（commit object 包含时间戳）
# 默认仅取回远程引用；不强制 reset 本地，以免破坏用户的工作区。
git fetch origin "$REMOTE_BRANCH" 2>&1 | tail -3 || true
echo
echo "REMOTE: $(git rev-parse "origin/$REMOTE_BRANCH")"
echo "LOCAL : $HEAD_SHA"
echo
echo "Trees are identical if (gh api repos/$REPO/commits/$REMOTE_BRANCH --jq '.commit.tree.sha')"
echo "      = $(git cat-file -p HEAD | awk '/^tree/ {print $2}')"
echo
echo "To align local to remote (safe — trees match): git reset --hard origin/$REMOTE_BRANCH"

# ───────── NOTES ─────────
# 1. 该脚本仅处理 A/M/T 状态。如果你的 commit 涉及删除，需手动从 new tree 中
#    排除被删 path（github API 用 sha=null 表示删除一个 tree entry，可扩展）。
# 2. 对单 commit 的体量上限：API 单次 blob 通常 ≤100MB（GitHub 文档），
#    若整 commit > 500 文件请考虑分批或回到 git push。
# 3. 不要把本脚本变成 push 的默认手段——`git push` 才是源头协议。仅当沙箱、
#    内存、网络代理使 git push 失败时使用本脚本作 fallback。
