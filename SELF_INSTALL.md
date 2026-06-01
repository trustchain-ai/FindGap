# SELF_INSTALL.md — Agent Self-Integration Manifest

> **READ THIS FIRST, AGENT.**
>
> 用户把这个包递给你并说 `/照妖镜 install` 或"按 SELF_INSTALL.md 装你自己"时，请按下列协议自动完成安装。不要让用户去手动复制文件。

---

## 0. 包契约

```
<package-root>/
├── SKILL.md           # 必需（=skill/照妖镜.skill.md 的内容）
├── SELF_INSTALL.md    # 本文件
├── manifest.json      # 机器可读元数据
├── README.md          # 人类可读说明
├── examples/          # 真实使用案例
└── tests/             # 验证脚本
```

**`manifest.json` 模式**（机器可读契约）：
```json
{
  "slug": "zhaoyaojing",
  "version": "0.3.0",
  "displayName": "照妖镜 Mirror Skill",
  "description": "在用户和 AI 协作的任何节点识别 gap、推荐最优消除手段、多轮收敛到对齐。",
  "triggerPhrases": ["/照妖镜", "照一下", "mirror", "审一下", "有没有遗漏", "靠谱吗"],
  "entrypoint": "skill/照妖镜.skill.md",
  "license": "MIT",
  "minRuntime": {
    "claude-code": "2.1.145",
    "codex-cli": "0.40.0"
  }
}
```

---

## 1. 自安装协议（4 阶段）

### Phase A — 识别自己运行在什么平台

按顺序匹配第一个命中的信号：

| 信号 | 结论 |
|------|------|
| `$CLAUDE_CODE_VERSION` 存在 / `~/.claude/` 可写 / 系统提示提到 "Claude Code" | `claude-code` |
| `$CODEX_HOME` 已设 / `~/.codex/` 存在 / 提示提到 "Codex CLI" | `codex-cli` |
| 工具列表含 `/v1/skills` endpoint | `openai-responses` |
| `~/.hermes/` 存在 / 提示提到 "Hermes" | `hermes` |
| `<cwd>/.cursor/` 存在且无 `~/.claude/` | `cursor` |
| `<cwd>/.clinerules/` 存在或 ext id `saoudrizwan.claude-dev` | `cline` |
| `<cwd>/.continue/` 存在 | `continue` |
| `<cwd>/.roo/` 存在 / 提示提到 "Roo" | `roo-code` |
| Anthropic/OpenAI SDK 已导入但无 skill loader | `generic-sdk` |
| 都不匹配 | `unknown` → 进 Phase E（fallback） |

记录为 `$PLATFORM`，向用户报一行：`Detected runtime: <X>. Installing to <path>.`

### Phase B — 解析目标路径

有 `.git` 优先 project scope，否则 user scope：

| Platform | Project | User | 文件名 |
|----------|---------|------|--------|
| claude-code | `<repo>/.claude/skills/zhaoyaojing/` | `~/.claude/skills/zhaoyaojing/` | `SKILL.md` |
| codex-cli | `<repo>/.agents/skills/zhaoyaojing/` | `~/.codex/skills/zhaoyaojing/` | `SKILL.md` |
| openai-responses | — | POST zip 到 `/v1/skills` | 整包 zip |
| hermes | `<repo>/skills/zhaoyaojing/` | `~/.hermes/skills/zhaoyaojing/` | `SKILL.md` |
| cursor | `<repo>/.cursor/rules/zhaoyaojing.mdc` | — | flatten + 补 mdc frontmatter |
| cline | `<repo>/.clinerules/zhaoyaojing.md` | `~/Documents/Cline/Rules/zhaoyaojing.md` | flatten |
| continue | `<repo>/.continue/rules/zhaoyaojing.md` | `~/.continue/rules/zhaoyaojing.md` | flatten |
| roo-code | `<repo>/.roo/rules/zhaoyaojing.md` | `~/.roo/rules/zhaoyaojing.md` | flatten |
| generic-sdk | `<repo>/.agents/skills/zhaoyaojing/` | `~/.agents/skills/zhaoyaojing/` | `SKILL.md` + loader snippet |

### Phase C — 复制 / 变换

1. `mkdir -p $TARGET_DIR`（或父目录，对 flatten 平台）

2. **目录型平台**（claude-code / codex-cli / hermes / generic-sdk）：递归拷贝 `skill/` 内容为 `$TARGET_DIR/SKILL.md`，flatten 平台禁止额外文件时跳过 `SELF_INSTALL.md` 和 `manifest.json`

3. **flatten 平台**（cursor / cline / continue / roo）：读 `skill/照妖镜.skill.md` → 按目标平台 **合并 frontmatter** → 单文件写入 `$TARGET`

   #### Cursor MDC 强制注入（必须做）

   Cursor 的 `.cursor/rules/*.mdc` 只读 frontmatter 决定是否激活。**flatten 时必须**在原 frontmatter 基础上注入下列字段：

   ```yaml
   ---
   description: <从原 SKILL.md description 完整拷贝，必须含触发短语>
   alwaysApply: false       # 让 Cursor 按 description 语义匹配自动激活
   globs: []                # 空数组表示不限文件类型
   ---
   ```

   保留原 SKILL.md 的 `description`（含触发词列表）—— Cursor 的语义匹配器只看这一行决定激活。

   #### Cline / Continue / Roo flatten

   保留原 frontmatter 即可（这些平台读 description 但不强制 `alwaysApply`）。

4. **openai-responses**：把整包压成 zip（排除 `SELF_INSTALL.md`）→ POST 多部分到 `/v1/skills` → 把返回的 `skill_id` 追加到 `~/.agents/.installed-skills` 账本

5. 不覆盖**等于或高于**当前 manifest.version 的已装版本，除非 `--force`

### Phase D — 验证（四闸全过才报成功）

| 闸 | 检查 |
|---|------|
| **Gate 1 Filesystem** | `test -s $TARGET`（或目录形态 `test -d $TARGET && test -s $TARGET/SKILL.md`） |
| **Gate 2 Schema** | YAML frontmatter 可解析，`name` + `description` 存在，slug 与 manifest 一致 |
| **Gate 3 Registry** | 跑平台原生 list 命令并 grep slug（Claude Code: `ls ~/.claude/skills/`；Codex: `ls ~/.codex/skills/`；Hermes: `hermes skills list`；Cursor: `ls .cursor/rules/`） |
| **Gate 4 Smoke trigger** | 输出 `Skill zhaoyaojing@0.3.0 installed at <path>. Try: 照一下` |

任一闸失败 → **回滚**（只删本次创建的内容） → 把失败闸原文告诉用户 → **绝不假装成功**。

### Phase E — Fallback（unknown 平台）

1. 选最通用位置：有 git repo 用 `<repo>/.agents/skills/zhaoyaojing/`；否则 `~/.agents/skills/zhaoyaojing/`；都不行用 `./zhaoyaojing/`
2. 原样复制 SKILL.md
3. 输出 loader snippet：
   ```
   You have a skill named "zhaoyaojing". Its instructions are at <abs-path>/SKILL.md.
   When user request matches: "照一下" | "审一下" | "靠谱吗" | "有没有遗漏" | "/照妖镜",
   read that file and follow it.
   ```
4. 诚实告知：`Runtime not auto-detected. Installed to <path>. 把上面 snippet 粘到你 agent 的 system prompt 里激活。`

---

## 2. 幂等 & 安全约束

- **同版本重跑** = no-op（只跑 Gate 1-4 verify）
- **不删** `$TARGET_DIR` 外文件
- **不在** `$HOME` 或当前 repo 之外写文件，除非用户显式确认
- **绝不执行** `scripts/` 内任何脚本（那是 skill 运行时内容，不是安装步骤）
- 平台支持时把 `zhaoyaojing@0.3.0 <iso8601> <path>` 写进 `.installed-skills` 账本备审

---

## 3. 卸载

用户说 `/照妖镜 uninstall`：

1. 反向 Phase B 定位 target
2. 删除目录/文件
3. 删除账本条目
4. 确认目标不存在

---

## 4. 拒绝条件（必须停下问用户）

- 检测返回 `unknown` 且你**无文件写工具**
- target 已存在更高版本（除非 `--force`）
- `manifest.json` 缺失或 schema 校验失败
- 缺必要工具（无 Bash / 无 Write）完成当前 Phase

**拒绝时说清拦截原因，绝不假装装好了。**

---

## 5. 降级策略（三档）

| Tier | 场景 | 动作 |
|------|------|------|
| **Tier 1** | 未知平台但能写文件 | 装到 `<repo>/.agents/skills/zhaoyaojing/` 或 `~/.agents/skills/zhaoyaojing/`，发 loader snippet，明确告知"auto-trigger 不保证" |
| **Tier 2** | 无文件写工具，纯浏览器 chat | 拒绝文件操作 → **内联打印**完整 SKILL.md 正文（`<skill name='zhaoyaojing'>...</skill>` 块）+ loader snippet → 让用户手动粘到系统提示 |
| **Tier 3** | 完全无工具/硬拒绝 | 输出 5 行人读安装指南 + `curl https://raw.githubusercontent.com/290963249/zhaoyaojing/main/skill/照妖镜.skill.md` |

跨三档：**不静默失败、点名拦截原因、不覆盖等版/新版（除非 --force）、保证再次运行幂等**。

---

## 用户使用方法

把整个包递给你的 AI agent，说一句：

> 读 `SELF_INSTALL.md` 并按协议把照妖镜装到你当前运行时，装完给我看 verify 输出。

Agent 会自己识别平台、自己复制文件、自己 verify。
