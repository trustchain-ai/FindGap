# 安装指南

照妖镜是一份 Skill 文件——**不需要编译、不需要装依赖、不需要起服务**。复制到对应位置即可使用。

---

## 1. Claude Code 安装

```bash
mkdir -p ~/.claude/skills/zhaoyaojing
curl -fsSL https://raw.githubusercontent.com/<your-org>/zhaoyaojing/main/skill/照妖镜.skill.md \
  -o ~/.claude/skills/zhaoyaojing/SKILL.md
```

**或本地克隆后**：

```bash
git clone https://github.com/<your-org>/zhaoyaojing.git
mkdir -p ~/.claude/skills/zhaoyaojing
cp zhaoyaojing/skill/照妖镜.skill.md ~/.claude/skills/zhaoyaojing/SKILL.md
```

### 验证

打开新的 Claude Code 会话，输入：
```
帮我照一下这个 PRD：我们要做一个性能好、用户体验流畅的支付系统，尽快上线。
```

**预期**：Claude 自动按 4 阶段（Detect / Decide / Eliminate / Converge）输出结构化报告。

---

## 2. Hermes 安装

### 全局安装（所有 profile 共享）

```bash
mkdir -p ~/.hermes/skills/zhaoyaojing
cp zhaoyaojing/skill/照妖镜.skill.md ~/.hermes/skills/zhaoyaojing/SKILL.md
```

### 单 profile 安装

```bash
# 替换 <profile> 为：architect / leader / ops / research / reviewer
mkdir -p ~/.hermes/profiles/<profile>/skills/zhaoyaojing
cp zhaoyaojing/skill/照妖镜.skill.md ~/.hermes/profiles/<profile>/skills/zhaoyaojing/SKILL.md
```

### 一键装到所有 profile

```bash
for p in architect leader ops research reviewer; do
  mkdir -p ~/.hermes/profiles/$p/skills/zhaoyaojing
  cp zhaoyaojing/skill/照妖镜.skill.md ~/.hermes/profiles/$p/skills/zhaoyaojing/SKILL.md
done
```

---

## 3. Cursor / Cline / 其他 MCP 客户端

照妖镜 v0.1 是 Claude Code Skill 格式。对其他客户端的支持在 v0.3 规划中（MCP Server 形态）。

**临时方案**：可以把 `skill/照妖镜.skill.md` 内容粘贴到 system prompt 或自定义 instruction。

---

## 4. 卸载

```bash
# Claude Code
rm -rf ~/.claude/skills/zhaoyaojing

# Hermes global
rm -rf ~/.hermes/skills/zhaoyaojing

# Hermes profiles
for p in architect leader ops research reviewer; do
  rm -rf ~/.hermes/profiles/$p/skills/zhaoyaojing
done
```

---

## 5. 触发方式

| 方式 | 操作 |
|------|------|
| 显式调用 | `/照妖镜 [产物]` 或 `用照妖镜审一下 [产物]` |
| 关键词自动 | 说 "照一下" / "审一下" / "靠谱吗" / "有没有遗漏" / "我没想到什么" / "帮我看看这个对不对" / "检查盲点" |
| 评审场景自动 | 提交 PRD / PR diff / 技术方案 / 合同 / 设计文档时自动识别 |

---

## 6. 故障排查

### Skill 没被加载

```bash
# 检查文件存在
ls ~/.claude/skills/zhaoyaojing/SKILL.md

# 检查 frontmatter
head -5 ~/.claude/skills/zhaoyaojing/SKILL.md
# 应该看到：
# ---
# name: 照妖镜
# description: ...
# ---

# 重启 Claude Code 让它重新扫描 skills 目录
```

### Claude 跳过了某个阶段

这是 prompt 注入失败。打开 `~/.claude/skills/zhaoyaojing/SKILL.md`，重新确认末尾的"给 Claude 的执行指令"段落完整。

### 多轮收敛卡死在第 3 轮

正常——这是设计上的硬上限。第 3 轮还没收敛的话，Skill 会输出"建议人工介入"并停止。
