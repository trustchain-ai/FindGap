# 系统架构

## 模块划分

| 模块 | 文件 | 职责 |
|------|------|------|
| 输入解析 | `engine/parser.ts` | 识别文本类型，拆分行 |
| 受众检测 | `engine/audience.ts` | Self-check / Receiver-check 视角 |
| Gap 检测 | `engine/detector.ts` | 11 规则检测 |
| 严重度判定 | `engine/severity.ts` | blocking / warning / defer |
| 依据处理 | `engine/evidence.ts` | 公开证据 / 上下文推理 / 信息不足 |
| 不确定性处理 | `engine/fallback.ts` | 信息不足时的显式标注 |
| 补齐方向指引 | `engine/advisor.ts` | 可选补齐方向 |
| 结果展示 | `engine/formatter.ts` | Flat List 输出 |
| 管线组合 | `engine/index.ts` | 完整管线入口 |
| CLI 入口 | `cli/index.ts` | 命令行路由 |
| 评测运行 | `eval/runner.ts` | fixture 回归 |

## 数据流

```
rawText → parseArtifact → detectRuleHits → applySeverity
  → classifyEvidence → applyFallback → addFillInDirections → formatFindings → output
```
