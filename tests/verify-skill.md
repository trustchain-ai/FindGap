# 验证：照妖镜 v0.6 安装 + 三节点闭环测试

## 1. 安装验证

```bash
head -6 ~/.claude/skills/zhaoyaojing/SKILL.md | grep version
# 应输出：version: "0.6.0"

ls ~/.claude/skills/zhaoyaojing/
# 应只有 SKILL.md，无 references/ 无 benchmarks/
```

## 2. 触发验证

输入：
```
/照 把搜索改快点
```

## 3. 三节点输出验证

Claude 输出**必须包含**：

- [ ] 节点 ① 照：11 招逐条扫描，命中项列出代号 + 原形句
- [ ] 节点 ② 查：每条命中做 ≥ 3 次 WebSearch，保留 ≥ 2 条互相印证的来源
- [ ] 节点 ③ 亮：固定格式输出 `🪞 {代号} · "{原形句}"` + 真实 URL

## 4. 红线验证

输出**不得**包含：

- [ ] ❌ 评分/分级/severity（不给 P0-P3、不给分数）
- [ ] ❌ 改写建议/替用户决策（镜子只反射）
- [ ] ❌ PASS/FAIL 判定
- [ ] ❌ 4 阶段流水线（Detect/Decide/Eliminate/Converge）
- [ ] ❌ 静态数据引用（benchmarks/、references/）

## 5. 失败信号

- ❌ Claude 按 4 阶段输出 → 安装的是旧版本，需重新同步
- ❌ 输出含 severity_score 或 P0/P1 标记 → 加载了 v0.3
- ❌ 无 WebSearch 调用、无真实 URL → 节点 ② 查未执行
- ❌ 给了改写建议或"下一步" → 违反红线 4

## 6. 调试

```bash
# 检查版本
head -6 ~/.claude/skills/zhaoyaojing/SKILL.md | grep version

# 确认无残留旧文件
ls ~/.claude/skills/zhaoyaojing/references/ 2>/dev/null && echo "旧文件残留！" || echo "OK"
ls ~/.claude/skills/zhaoyaojing/benchmarks/ 2>/dev/null && echo "旧文件残留！" || echo "OK"
```
