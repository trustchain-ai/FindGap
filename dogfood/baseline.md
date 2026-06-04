# v0.7 基线报告

> 样本：`dogfood/runs/005-024` 共 20 条真实 `/照` 记录
>
> 口径：仅统计 11 条官方规则；`V-STAKE-TODO` 归并为 `V-STAKE`
>
> 当前稳定可得：命中、TP、FP、precision。总 TPR 因缺“应检出总数”分母，暂不回算。

## control 边界

本报告是 **within-project、author-in-the-loop labeling** 的内部 control：

- 判定者主要是 prompt 作者本人
- 样本高度集中于支付 / PRD / 技术方案类文本
- 结果可用于建立 **precision baseline**
- 结果**不可直接外推**为 recall、external validity 或因果效果

## 分规则结果

| 规则 | 命中 | TP | FP | precision | 覆盖率 |
|------|----:|---:|---:|----------:|------:|
| S-PERF | 4 | 4 | 0 | 1.0000 | 20.0% |
| S-QUANT | 14 | 14 | 0 | 1.0000 | 70.0% |
| S-NFR | 3 | 3 | 0 | 1.0000 | 15.0% |
| R-DOD | 20 | 20 | 0 | 1.0000 | 100.0% |
| G-WHY | 13 | 12 | 1 | 0.9231 | 65.0% |
| G-NOGO | 14 | 14 | 0 | 1.0000 | 70.0% |
| I-SSOT | 18 | 18 | 0 | 1.0000 | 90.0% |
| I-ADR | 16 | 16 | 0 | 1.0000 | 80.0% |
| V-NAME | 19 | 19 | 0 | 1.0000 | 95.0% |
| V-STAKE | 20 | 20 | 0 | 1.0000 | 100.0% |
| V-LAYER | 13 | 11 | 2 | 0.8462 | 65.0% |

## 总量聚合

| 指标 | 数值 |
|------|----:|
| runCount | 20 |
| totalHits | 154 |
| totalTp | 151 |
| totalFp | 3 |
| overall precision | 0.9805 |
| overall FP share | 1.9481% |

## 计数口径提醒

- 多 hit prompt 允许同一条 run 命中多条规则
- `overall precision` 按 **perHit** 计算，不按 perRun
- “高 ROI 规则”当前基于 **频次 × precision × 下游严重度** 的内部判断
- 进入 v0.8 后，需改为 **matched-strata** 下比较，避免被样本分布绑架

## 高杠杆优先级（当前 control 内）

1. **R-DOD** — 20/20，precision 1.0000  
   最强共性问题。直接决定“是否可验收”。
2. **V-STAKE** — 20/20，precision 1.0000  
   最强优先级问题。stakes 不清，团队无法正确排序投入。
3. **V-NAME** — 19/20，precision 1.0000  
   命名歧义几乎普遍存在，且最早、最便宜、最该先消除。
4. **I-SSOT** — 18/20，precision 1.0000  
   缺单一事实源会把歧义扩散到实现、联调、验收。
5. **I-ADR** — 16/20，precision 1.0000  
   缺决策理由会持续抬高修改与交接成本。
6. **G-NOGO** — 14/20，precision 1.0000  
   边界不清会稳定引发 scope creep。

## 需优先调优

- **V-LAYER** — 13 命中，11 TP，2 FP，precision 0.8462；11 条规则里最低，应先收窄判定条件。
- **G-WHY** — 13 命中，12 TP，1 FP，precision 0.9231；次优先，重点减少“stakes / DoD 已隐含 why”时的过判。

## 暂非 v0.8 主战场

- **S-QUANT** — 14/20，常见，但通常与 DoD、stakes 联动治理更有效。
- **S-PERF** — 4/20、**S-NFR** — 3/20，问题真实存在，但频次明显低于验收、边界、命名、事实源、决策理由。

## 高频模式

1. 验收含混是头号重复问题：`R-DOD` 20/20。
2. 上下文 framing 系统性偏弱：`V-STAKE` 20/20、`G-NOGO` 14/20。
3. 术语、事实源、决策理由经常一起缺：`V-NAME` 19/20、`I-SSOT` 18/20、`I-ADR` 16/20。
4. 当前主要缺的不是原始细节数量，而是结构化表达：名字、权威来源、决策理由、完成定义不到位时，后续细节都不稳。
5. 量化缺口常见但 ROI 次于 DoD / stakes：`S-QUANT` 14/20 值得保留，但优先级应低于高频高杠杆规则。
6. 检测器整体已可用：11 条规则里 9 条 precision = 1.0000。v0.8 应做“测量校准优先 + 高杠杆增强 + 低精度定点调优”，不是全面重训。
7. 低精度调优顺序：先 `V-LAYER`，后 `G-WHY`。

## matched-strata 比较要求（v0.8）

v0.8 起，所有“更好了没有”的比较都必须在 matched-strata 下进行：

- 同类 promptType 比同类 promptType
- E1 与 E2 不混池
- correctness 和 usefulness signals 分栏，不得交叉替代
- adoption / rewrite / disagreement 只作 usefulness signals，不作 detector quality 证据

## 结论

v0.7 证明的不是”整体还不准”，而是：

- **整体已准**：154 命中里 151 个 TP，overall precision = 0.9805
- **测量校准优先**：当前 precision 已高，但判定者主要是 prompt 作者本人、样本集中于支付/PRD 类、recall 无分母——v0.8 的第一优先级是校准测量体系（独立判定、样本分层、coverage proxy），而不是直接强化规则
- **高杠杆规则增强是第二步**：在测量校准站得住之后，再针对 R-DOD / V-STAKE / V-NAME / I-SSOT / I-ADR / G-NOGO 做修复引导增强
- **低精度规则定点收窄是第三步**：先 `V-LAYER`，后 `G-WHY`
