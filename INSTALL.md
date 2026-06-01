# 安装指南

照妖镜是一份 Skill 文件——**不需要编译、不需要装依赖、不需要起服务**。复制到对应位置即可使用。

---

## 🍎 macOS / Linux

### 1. Claude Code 安装

**方式 A：一键 curl 安装（最快）**

```bash
curl -fsSL https://raw.githubusercontent.com/290963249/zhaoyaojing/main/skill/照妖镜.skill.md \
  -o /tmp/zhaoyaojing-skill.md && \
  mkdir -p ~/.claude/skills/zhaoyaojing && \
  mv /tmp/zhaoyaojing-skill.md ~/.claude/skills/zhaoyaojing/SKILL.md && \
  echo "✅ 照妖镜已安装"
```

**方式 B：克隆仓库（便于后续更新）**

```bash
git clone https://github.com/290963249/zhaoyaojing.git
mkdir -p ~/.claude/skills/zhaoyaojing
cp zhaoyaojing/skill/照妖镜.skill.md ~/.claude/skills/zhaoyaojing/SKILL.md
```

### 2. Hermes 安装

**全局（所有 profile 共享）**

```bash
mkdir -p ~/.hermes/skills/zhaoyaojing
cp zhaoyaojing/skill/照妖镜.skill.md ~/.hermes/skills/zhaoyaojing/SKILL.md
```

**一键装到所有 profile**

```bash
for p in architect leader ops research reviewer; do
  mkdir -p ~/.hermes/profiles/$p/skills/zhaoyaojing
  cp zhaoyaojing/skill/照妖镜.skill.md ~/.hermes/profiles/$p/skills/zhaoyaojing/SKILL.md
done
```

### 3. 卸载

```bash
rm -rf ~/.claude/skills/zhaoyaojing
rm -rf ~/.hermes/skills/zhaoyaojing
for p in architect leader ops research reviewer; do
  rm -rf ~/.hermes/profiles/$p/skills/zhaoyaojing
done
```

---

## 🪟 Windows

### 前置条件

- [Git for Windows](https://git-scm.com/download/win)（含 Git Bash）
- [Claude Code Desktop](https://claude.com/claude-code)
- PowerShell 7+ 或 Git Bash

### 1. Claude Code 安装（PowerShell）

```powershell
# 克隆 + 安装
git clone https://github.com/290963249/zhaoyaojing.git
cd zhaoyaojing

New-Item -ItemType Directory -Path "$env:USERPROFILE\.claude\skills\zhaoyaojing" -Force | Out-Null
Copy-Item "skill\照妖镜.skill.md" "$env:USERPROFILE\.claude\skills\zhaoyaojing\SKILL.md"

# 验证
if (Test-Path "$env:USERPROFILE\.claude\skills\zhaoyaojing\SKILL.md") {
    Write-Host "✅ 照妖镜已安装" -ForegroundColor Green
}
```

### 2. Claude Code 安装（Git Bash / WSL）

```bash
git clone https://github.com/290963249/zhaoyaojing.git
mkdir -p ~/.claude/skills/zhaoyaojing
cp zhaoyaojing/skill/照妖镜.skill.md ~/.claude/skills/zhaoyaojing/SKILL.md
```

### 3. 一键 curl 安装（PowerShell）

```powershell
$skillPath = "$env:USERPROFILE\.claude\skills\zhaoyaojing"
New-Item -ItemType Directory -Path $skillPath -Force | Out-Null
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/290963249/zhaoyaojing/main/skill/照妖镜.skill.md" `
  -OutFile "$skillPath\SKILL.md"
Write-Host "✅ 照妖镜已安装到 $skillPath" -ForegroundColor Green
```

### 4. 卸载（PowerShell）

```powershell
Remove-Item -Recurse -Force "$env:USERPROFILE\.claude\skills\zhaoyaojing"
```

### ⚠️ Windows 注意事项

- `~/.claude/skills/` 实际路径是 `C:\Users\<用户名>\.claude\skills\`
- 文件名带中文兼容，但最终文件名建议保留 `SKILL.md`
- PowerShell 默认编码可能影响中文显示，建议执行一次：`[Console]::OutputEncoding = [System.Text.Encoding]::UTF8`
- Hermes 在 Windows 上的支持依赖你的 Hermes 安装方式，参考 [Hermes 官方文档](https://hermes-agent.ai)

---

## 通用：Cursor / Cline / 其他 MCP 客户端

照妖镜 v0.1 是 Claude Code Skill 格式。对其他客户端的支持在 v0.3 规划中（MCP Server 形态）。

**临时方案**：把 `skill/照妖镜.skill.md` 内容粘贴到 system prompt 或自定义 instruction。

---

## 触发方式（跨平台一致）

| 方式 | 操作 |
|------|------|
| 显式调用 | `/照妖镜 [产物]` 或 `用照妖镜审一下 [产物]` |
| 关键词自动 | 说"照一下" / "审一下" / "靠谱吗" / "有没有遗漏" / "我没想到什么" / "帮我看看这个对不对" / "检查盲点" |
| 评审场景自动 | 提交 PRD / PR diff / 技术方案 / 合同 / 设计文档时自动识别 |

---

## 故障排查

### Skill 没被加载

**macOS / Linux：**

```bash
ls ~/.claude/skills/zhaoyaojing/SKILL.md
head -5 ~/.claude/skills/zhaoyaojing/SKILL.md
```

**Windows：**

```powershell
Test-Path "$env:USERPROFILE\.claude\skills\zhaoyaojing\SKILL.md"
Get-Content "$env:USERPROFILE\.claude\skills\zhaoyaojing\SKILL.md" -Head 5
```

应该看到：
```
---
name: 照妖镜
description: ...
---
```

如果文件正常但 Skill 没触发——重启 Claude Code 让它重新扫描 skills 目录。

### Claude 跳过了某个阶段

这是 prompt 注入失败。打开 SKILL.md，重新确认末尾"给 Claude 的执行指令"段落完整。

### 多轮收敛卡死在第 3 轮

正常——这是设计上的硬上限。第 3 轮还没收敛会输出"建议人工介入"并停止。
