# 贡献指南

FindGap 是一份 **Skill 文件**，不是一个代码工程。贡献门槛极低——能改 Markdown 就能贡献。

---

## 开发结构

- `skill/`：行为契约（FindGap.skill.md）
- `engine/`：TypeScript 规则与输出管线
- `cli/`：命令行入口
- `eval/`：回归与样本评测
- `tests/`：Vitest 测试套件

---

## 你可以贡献什么

| 类型 | 难度 | 示例 |
|------|-----|------|
| **改进扫描规则** | ⭐ | 某条规则误报率高，提供更精准的扫描条件 |
| **新增 examples** | ⭐ | 在 `examples/` 加你的真实 FindGap case |
| **多语言支持** | ⭐⭐ | 把 skill 文件翻译成英文 / 日文 |
| **修复触发误判** | ⭐⭐⭐ | 发现 FindGap 在不该激活的场景激活，提供反例 |

---

## 提交流程

1. Fork 本仓库
2. 新建分支：`git checkout -b feat/improve-perf-rule`
3. 修改 `skill/FindGap.skill.md`（或对应 example）
4. **必须在 `examples/` 加 1 个真实 case 证明改动有效**
5. 提 PR

---

## PR 标准

| 改什么 | 必须证明 |
|-------|---------|
| 改进规则 | 给 ≥ 2 个真实命中证据 |
| 修触发 | 给 ≥ 3 个 false positive / false negative 反例 |

---

## 沉淀真实 case

如果你在工作中用了 FindGap：

1. 把你的文档原文放到 `examples/NN-描述.md`
2. 跑一遍 `/findgap`，把完整输出贴上
3. 标注哪些 gap 有用、哪些误报、优化方案是否被采纳

---

## 不接受的 PR

- ❌ 给 FindGap 加评分 / PASS-FAIL
- ❌ 把 Skill 变成代码（加 hook / 加 MCP / 加 Python）
- ❌ 加静态数据库 / 知识库
- ❌ 在输出中暴露内部规则代号
- ❌ 让 FindGap 去扫 AI 已交付的输出（那是 FindMiss 的事）

---

## 行为准则

- 诚实评估：发现 FindGap 失效的场景必须报告
- 反对过度设计：能用 1 段 Markdown 解决就不要加 1000 行代码
