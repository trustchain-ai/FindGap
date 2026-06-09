# 软件说明书

## 软件名称
TrustChain FindGap 智能请求缺口分析系统 1.0.0

## 适用场景
- 交接前 owner 自检（Self-check）
- 接手前 receiver 他检（Receiver-check）

## 运行环境
- macOS / Linux / Windows
- Node.js >= 18
- 兼容 Claude Code / Codex CLI 等 AI agent 环境

## 核心流程
1. 找交接缺口（受众检测 + 11 规则扫描 + 严重度判定）
2. 校验依据（公开证据 / 上下文推理 / 信息不足）
3. 展示并校对（severity + 原文锚点 + 缺失信息 + 下游风险 + 依据类型 + 可选补齐方向）

## 功能说明
- 11 条 gap 检测规则覆盖 4 类高成本专业 gap
- 致命 / 阻塞 / 可延后 三级严重度判定
- 三层依据类型：公开证据、上下文推理、信息不足
- Self-check 和 Receiver-check 双视角校对
- CLI 命令：`findgap check <file>` / `findgap eval` / `findgap report`

## 使用示例
```bash
findgap check artifact.md
findgap check artifact.md receiver-check
findgap eval --suite tests/fixtures/rule-coverage
findgap report
```
