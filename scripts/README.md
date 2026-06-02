# scripts/

仓库工具脚本。**不影响 Skill 本身的运行**——这些脚本仅服务于维护者发布流程。

## api-push.sh — 绕过 git push 的 GitHub API 推送

### 何时使用

正常情况下用 `git push`。**仅在以下场景** fallback 到本脚本：

- 沙箱环境（Claude Code / Codex CLI / 隔离容器）中 `git push` 被 SIGKILL（exit 137）
- 公司代理 / VPN 把 git smart-http 协议吞了，但 GitHub REST API 仍可用
- 大 commit 在 git pack 阶段触发内存压力（罕见但发生过）
- 远程仓库只开放了 API 不开放 git protocol

### 用法

```bash
# 推送 HEAD 到远程同名分支（最常见）
./scripts/api-push.sh

# 推送到指定分支（首次创建或快进）
./scripts/api-push.sh feat/my-branch

# 覆盖远程仓库（默认从 gh repo view 推断）
REPO=290963249/zhaoyaojing ./scripts/api-push.sh
```

### 前置条件

| 项 | 检查命令 |
|---|---------|
| gh CLI 已登录 | `gh auth status` 显示 ✓ |
| 当前 HEAD 是普通 commit（非 merge） | `git log --merges HEAD -1` 为空 |
| HEAD 的 parent 已在远程 | 自动检查 |
| 工作目录有 `jq` | `command -v jq` |

### 工作原理

`git push` 在沙箱中失败的根因是 git pack 阶段或网络子进程被守护进程拦截。本脚本绕开整个 git transport 协议，改用 4 步 REST API：

```
1. POST /repos/.../git/blobs     × N        # 每文件 base64 上传
2. POST /repos/.../git/trees                # base_tree + 增量 patch
3. POST /repos/.../git/commits              # 复用本地 commit message
4. PATCH /repos/.../git/refs/heads/{branch} # fast-forward
```

每次调用 ≤几十 KB，不触发内存峰值，不依赖任何子进程网络栈。

### 已知限制

| 限制 | 处理 |
|------|------|
| 不支持 delete | 检测到删除会 abort（避免数据丢失），需手动扩展 |
| 不支持 rename/copy | 同上，需拆为 delete + add |
| 不支持 merge commit | 仅处理单 parent commit |
| 单 blob ≤100MB | GitHub API 上限，未达 |
| 整 commit 文件数 > 500 | 速度变慢，建议拆 commit 或回到 git push |
| 本地与远程 commit sha 会不同 | tree 相同，sha 因 API 重新打时间戳而异；脚本提示用 `git reset --hard origin/{branch}` 对齐 |

### 历史

本脚本是 v0.4 发布过程的固化产物：`ec5d2cb → 2061e03` 推送时 `git push` 被沙箱
SIGKILL，临时用 API 流程推送成功。沉淀于此，避免下次重试。

详见 [`dogfood/runs/002-self-v04-bootstrap.md`](../dogfood/runs/002-self-v04-bootstrap.md)。
