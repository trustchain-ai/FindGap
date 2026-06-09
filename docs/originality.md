# 原创性声明

## 原创部分
- 交接点 Gap 校对产品定义与方法论
- 11 条规则体系及其 handoff 场景优先级排序
- Self-check / Receiver-check 双模式设计
- 固定输出契约与三层依据类型分层
- 数据驱动的 dogfood 验证体系（判定协议、baseline 报告、matched-strata 比较）
- 从 171 条根因中经三维交集筛选为 11 条的规则精炼过程

## 第三方依赖
- Node.js runtime（MIT）
- TypeScript（Apache 2.0）
- Vitest（MIT）

## 调用接口说明
- FindGap 以 skill 文件形式在 Claude Code / Codex CLI 等 AI agent 环境中被加载执行
- CLI 命令通过 Node.js 运行时调用 engine 模块
- 不维护运行时静态数据库，行业数据每次通过 WebSearch 现查
