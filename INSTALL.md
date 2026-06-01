# 安装指南

照妖镜是一份 Skill 文件——**不需要编译、不需要装依赖、不需要起服务**。

> **v0.2 升级**：现已支持 **10+ 平台**（Claude Code / Codex CLI / Hermes / Cursor / Cline / Continue / Roo / OpenAI Responses / generic SDK / fallback）
>
> 推荐让你的 AI agent 看 [`SELF_INSTALL.md`](SELF_INSTALL.md) 自动安装。

---

## ⚡ 推荐方式：Agent 自动安装

把整个仓库 clone 下来，对你的 AI 说：

> 读 `SELF_INSTALL.md` 并按协议把照妖镜装到你当前运行时，装完给我看 verify 输出。

agent 会自己识别平台、选目标路径、复制文件、4 闸验证。详见 [`SELF_INSTALL.md`](SELF_INSTALL.md)。

---

## 🍎 macOS / Linux 手动安装

### Claude Code

```bash
git clone https://github.com/290963249/zhaoyaojing.git
mkdir -p ~/.claude/skills/zhaoyaojing
cp -R zhaoyaojing/skill ~/.claude/skills/zhaoyaojing/
cp -R zhaoyaojing/references ~/.claude/skills/zhaoyaojing/
cp -R zhaoyaojing/benchmarks ~/.claude/skills/zhaoyaojing/

# 主文件改名为 SKILL.md（约定）
mv ~/.claude/skills/zhaoyaojing/skill/照妖镜.skill.md ~/.claude/skills/zhaoyaojing/SKILL.md
```

**简化版**（只装核心 Skill 文件，不装 references/benchmarks）：

```bash
mkdir -p ~/.claude/skills/zhaoyaojing
curl -fsSL https://raw.githubusercontent.com/290963249/zhaoyaojing/main/skill/照妖镜.skill.md \
  -o ~/.claude/skills/zhaoyaojing/SKILL.md
```

### Codex CLI

```bash
mkdir -p ~/.codex/skills/zhaoyaojing
cp -R zhaoyaojing/* ~/.codex/skills/zhaoyaojing/
# 部分版本需要：codex --enable skills
```

### Hermes（全局 + 5 个 profile）

```bash
# 全局
mkdir -p ~/.hermes/skills/zhaoyaojing
cp -R zhaoyaojing/* ~/.hermes/skills/zhaoyaojing/

# 所有 profile
for p in architect leader ops research reviewer; do
  mkdir -p ~/.hermes/profiles/$p/skills/zhaoyaojing
  cp -R zhaoyaojing/* ~/.hermes/profiles/$p/skills/zhaoyaojing/
done
```

### Cursor（需 flatten + 注入 frontmatter）

```bash
mkdir -p .cursor/rules

# 复制 + 注入 Cursor 专属 frontmatter
cat > .cursor/rules/zhaoyaojing.mdc <<'EOF'
---
description: 在用户和 AI 协作的任何节点（评审 PRD / 评 PR / 审方案）识别 gap、推荐最优消除手段、多轮收敛到对齐。当用户说"照一下""有没有遗漏""审一下""靠谱吗""检查盲点"时自动加载。
alwaysApply: false
globs: []
---
EOF
tail -n +5 zhaoyaojing/skill/照妖镜.skill.md >> .cursor/rules/zhaoyaojing.mdc
```

### Cline / Continue / Roo

```bash
# Cline
mkdir -p .clinerules && cp zhaoyaojing/skill/照妖镜.skill.md .clinerules/zhaoyaojing.md

# Continue
mkdir -p .continue/rules && cp zhaoyaojing/skill/照妖镜.skill.md .continue/rules/zhaoyaojing.md

# Roo
mkdir -p .roo/rules && cp zhaoyaojing/skill/照妖镜.skill.md .roo/rules/zhaoyaojing.md
```

---

## 🪟 Windows 手动安装

### Claude Code（PowerShell）

```powershell
git clone https://github.com/290963249/zhaoyaojing.git
cd zhaoyaojing

$skillDir = "$env:USERPROFILE\.claude\skills\zhaoyaojing"
New-Item -ItemType Directory -Path $skillDir -Force | Out-Null

Copy-Item -Recurse "skill" "$skillDir\"
Copy-Item -Recurse "references" "$skillDir\"
Copy-Item -Recurse "benchmarks" "$skillDir\"

# 重命名主文件
Rename-Item "$skillDir\skill\照妖镜.skill.md" "$skillDir\SKILL.md"
```

### 一键 curl 安装（PowerShell，简化版）

```powershell
$skillPath = "$env:USERPROFILE\.claude\skills\zhaoyaojing"
New-Item -ItemType Directory -Path $skillPath -Force | Out-Null
Invoke-WebRequest `
  -Uri "https://raw.githubusercontent.com/290963249/zhaoyaojing/main/skill/照妖镜.skill.md" `
  -OutFile "$skillPath\SKILL.md"
Write-Host "✅ 照妖镜已安装到 $skillPath" -ForegroundColor Green
```

### Git Bash / WSL

```bash
# 与 macOS 命令一致
git clone https://github.com/290963249/zhaoyaojing.git
mkdir -p ~/.claude/skills/zhaoyaojing
cp -R zhaoyaojing/skill/照妖镜.skill.md ~/.claude/skills/zhaoyaojing/SKILL.md
```

### ⚠️ Windows 注意事项

- `~/.claude/skills/` 实际路径是 `C:\Users\<用户名>\.claude\skills\`
- `.claude` 是隐藏目录，资源管理器需开启"显示隐藏项"
- PowerShell 默认编码可能影响中文显示，执行一次：`[Console]::OutputEncoding = [System.Text.Encoding]::UTF8`

---

## 🔌 完整平台路径表

| 运行时 | 项目级 | 用户级 | 改造 |
|--------|--------|--------|------|
| **Claude Code** | `<repo>/.claude/skills/zhaoyaojing/` | `~/.claude/skills/zhaoyaojing/` | 无 |
| **Codex CLI** | `<repo>/.agents/skills/zhaoyaojing/` | `~/.codex/skills/zhaoyaojing/` | 无 |
| **Hermes** | `<repo>/skills/zhaoyaojing/` | `~/.hermes/skills/zhaoyaojing/` | 无 |
| **Cursor** | `<repo>/.cursor/rules/zhaoyaojing.mdc` | — | flatten + frontmatter |
| **Cline** | `<repo>/.clinerules/zhaoyaojing.md` | `~/Documents/Cline/Rules/zhaoyaojing.md` | flatten |
| **Continue** | `<repo>/.continue/rules/zhaoyaojing.md` | `~/.continue/rules/zhaoyaojing.md` | flatten |
| **Roo Code** | `<repo>/.roo/rules/zhaoyaojing.md` | `~/.roo/rules/zhaoyaojing.md` | flatten |
| **OpenAI Responses** | POST zip 到 `/v1/skills` | — | 整包 zip |
| **Generic / 未知** | `<repo>/.agents/skills/zhaoyaojing/` | `~/.agents/skills/zhaoyaojing/` | 无 + loader snippet |

---

## 🧪 验证

| 运行时 | 验证命令 |
|--------|---------|
| Claude Code | `ls ~/.claude/skills/zhaoyaojing/SKILL.md` 或在 Claude Code 内问 "what skills do you have?" |
| Codex CLI | `ls ~/.codex/skills/zhaoyaojing/SKILL.md` 或问 "Summarize the skills you have loaded" |
| Hermes | `hermes skills list \| grep zhaoyaojing` |
| Cursor | `ls .cursor/rules/zhaoyaojing.mdc` + Settings 中可见 |
| Cline / Continue / Roo | `ls` 对应规则目录 + 一次冒烟 prompt |

成功后输出：`Skill zhaoyaojing@0.2.0 installed at <path>. Try: 照一下`

---

## 触发方式（跨平台一致）

| 方式 | 操作 |
|------|------|
| 显式调用 | `/照妖镜 [产物]` 或 "用照妖镜审一下 [产物]" |
| 关键词自动 | 说 "照一下" / "审一下" / "靠谱吗" / "有没有遗漏" / "我没想到什么" / "检查盲点" |
| 评审场景自动 | 提交 PRD / PR diff / 技术方案 / 合同 / 设计文档时自动识别 |

---

## 故障排查

### Skill 没被加载

检查文件存在 + frontmatter 完整：

```bash
ls ~/.claude/skills/zhaoyaojing/SKILL.md
head -5 ~/.claude/skills/zhaoyaojing/SKILL.md
```

应该看到：
```
---
name: 照妖镜
description: ...
---
```

如果文件正常但 Skill 没触发——**重启 Claude Code** 让它重新扫描 skills 目录。

### Cursor 不触发

Cursor 的 MDC 文件 frontmatter 必须含 `alwaysApply` 和 `globs`：
```yaml
---
description: <含触发短语>
alwaysApply: false
globs: []
---
```

### 多轮收敛卡死在第 3 轮

这是设计上的硬上限。Phase 4 会输出"建议人工介入"并停止。

---

## 卸载

```bash
# macOS / Linux
rm -rf ~/.claude/skills/zhaoyaojing
rm -rf ~/.hermes/skills/zhaoyaojing
rm -rf ~/.codex/skills/zhaoyaojing
for p in architect leader ops research reviewer; do
  rm -rf ~/.hermes/profiles/$p/skills/zhaoyaojing
done

# Windows PowerShell
Remove-Item -Recurse -Force "$env:USERPROFILE\.claude\skills\zhaoyaojing"
```
