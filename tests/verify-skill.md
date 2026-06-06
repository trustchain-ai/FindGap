# 验证：FindGap v0.9 行为验证 + 流程检查

## A. Skill 行为验证

### 1. 触发验证

```text
/findgap 做一个支持先买后付的结账能力，性能要好，体验要流畅，上线尽快
/fg review this PRD
/照 这个任务描述
```

### 2. 输出行为验证

FindGap 输出**必须包含**：

- [ ] 头部：`FindGap · 发现 N 处 gap 可能导致返工`
- [ ] 每条 gap 有严重度 emoji（🔴/🟠/🟡）+ 用人话说的 gap 名
- [ ] 每条 gap 有 `原文：` 引用文档原始句子
- [ ] 每条 gap 有 `缺口：` 直述缺什么、会怎么卡
- [ ] 🔴 和 🟠 必须有 `优化方案：` 含决策依据
- [ ] 每条 gap 有 `参考依据：` 含可点击 URL 或 ⚠️ 兜底推理

### 3. 禁止项验证

输出**不得**包含：

- [ ] ❌ 规则代号（S-PERF、V-NAME、R-DOD 等）
- [ ] ❌ 多角色视角映射（角色 A / 角色 B / 碰撞点）
- [ ] ❌ PASS / FAIL
- [ ] ❌ 评分 / 分级 / 排名
- [ ] ❌ 替用户改写文档
- [ ] ❌ 搜不到数据就只写"无可信公开数据"不给兜底

### 4. 三层证据验证

- [ ] Tier 1：有 ≥2 条可点击 URL 互证
- [ ] Tier 2：搜不到时有 `⚠️ 基于文档现状与领域常识推理：` + 推理内容
- [ ] Tier 3：极端情况有 `⚠️ 当前信息不足，需人工补充判断`

### 5. 兼容触发验证

- [ ] `/findgap` 能触发
- [ ] `/fg` 能触发
- [ ] `/照` 能触发
- [ ] `/照妖镜` 能触发

## B. 流程检查

### 1. 版本验证

```bash
grep version skill/FindGap.skill.md | head -1
# 应输出：version: "0.9.0"
```

### 2. 品牌验证

```bash
grep -c 'FindGap' README.md
# 应 >= 5
```

### 3. 规则代号泄露检查

```bash
rg 'S-PERF|S-QUANT|S-NFR|R-DOD|G-WHY|G-NOGO|I-SSOT|I-ADR|V-NAME|V-STAKE|V-LAYER' README.md
# 应无匹配
```
