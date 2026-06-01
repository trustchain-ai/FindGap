# 验证：照妖镜 Skill 安装 + 触发测试

## 1. 安装验证

```bash
ls -la ~/.claude/skills/照妖镜.skill.md
# 应该输出文件存在，约 12KB
```

## 2. 触发验证（3 种方式）

### 方式 1：显式调用
打开 Claude Code，输入：
```
/照妖镜 帮我看下这个 PRD：
"我们需要做一个性能好、用户体验友好的支付系统。"
```

**预期**：Claude 自动加载照妖镜 Skill，按 4 阶段输出报告。

### 方式 2：关键词触发
```
这个方案靠谱吗：
"用 Redis 做分布式锁，确保订单不重复。"
```

**预期**：Skill 因关键词"靠谱吗"触发。

### 方式 3：审视类问题
```
帮我审一下这段代码有没有遗漏：
function pay(amount) { return api.charge(amount); }
```

**预期**：Skill 因"审一下""遗漏"触发。

## 3. 输出验证

每个触发场景，Claude 输出**必须包含**：

- [ ] Phase 1: Detect 识别表格（含命中位置 + 命中证据）
- [ ] Phase 2: Decide 决策表（每个 gap 对应一个推荐手段）
- [ ] Phase 3: Eliminate 消除执行（带具体产出）
- [ ] Phase 4: Converge 收敛判定 + 最终报告

**失败信号**：
- ❌ Claude 直接给修改建议，没走 4 阶段 → Skill 未加载
- ❌ 只列 gap 但没给"命中证据" → Skill 未严格执行
- ❌ 让你"在 5 个手段里选一个" → Skill 红线违反

## 4. 调试

如果 Skill 没自动加载：

```bash
# 检查文件存在
ls ~/.claude/skills/照妖镜.skill.md

# 检查 frontmatter 格式
head -5 ~/.claude/skills/照妖镜.skill.md
# 应该看到 ---\nname: 照妖镜\ndescription: ...\n---

# 在 Claude Code 中显式列出可用 skills
/skills
# 或重启 Claude Code 让它重新扫描 skills 目录
```
