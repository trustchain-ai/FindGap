# README Redesign Design

## Goal

把当前 README 从“信息堆叠页”重构成“GitHub 首页转化页”：先打中人，再给证据，再让用户立即试 `/照`，同时保持中英一致、信息高密度、证据边界诚实。

## Current Problems

1. **首屏没打中人**：读者看完前 10 秒，不一定知道为什么该立刻试 `/照`
2. **信息太散**：价值主张、baseline 证据、安装方式、方法说明、路线图、社区入口互相抢注意力
3. **中英不统一**：中文和英文像两套内容，结构与职责不对齐
4. **证据呈现失衡**：20-run baseline 很强，但没被组织成最强的信任路径

## Design Choice

采用 **Dual-Track README**：在同一个 README 中，用一套统一结构，同时服务两类读者。

- **Track A: Try now** — 给想立刻判断“值不值得试”的读者
- **Track B: Why trust this** — 给想先判断“这东西靠不靠谱”的读者

不是拆成两个 README，也不是把中文和英文分成上下两大块，而是在一个 README 里统一组织阅读路径。

## Information Architecture

### Top of file
1. Title
2. One-line promise
3. One-line boundary / trust qualifier
4. CN/EN language toggle

### Above the fold
5. **Proof in one screen**
   - 20-run baseline 的 4 个最高频问题
   - 一句总结：问题不是模型弱，而是输入含混
6. **Primary CTA**
   - 立即试 `/照`
   - 不先讲安装细节

### Track A — Try now
7. Minimal install
8. 3 usage examples
9. when to use / when not to use

### Track B — Why trust this
10. 20-run baseline 是什么
11. 它证明了什么
12. 它还没有证明什么
13. baseline 证据入口

### Shared understanding
14. How `/照` works（3 bullets）
15. One flagship ambiguity-before / reflection-after example
16. 11 rules overview
17. Trust boundaries

### Closing sections
18. Roadmap
19. Community footer
20. FAQ
21. License

## Bilingual Strategy

### Rule 1: Same structure
中文和英文必须走同一节奏，不能中文是完整说明、英文只是压缩摘要。

### Rule 2: Same job per section
每个 section 的中英都回答同一个问题：
- Hero 回答“这是什么”
- Proof 回答“为什么值得信”
- Try now 回答“怎么立刻试”

### Rule 3: Different length, same meaning
英文可以更短，但不能换定位、换证据口径、换 CTA。

### Implementation pattern
采用 **section 内镜像双语**，而不是“上半页中文 / 下半页英文”。

推荐写法：
- 中文一句
- 紧跟英文镜像一句

不允许：
- 中文区夹大段英文解释
- 英文区再重复另一套论证
- 同一概念中英不等价翻译

## Proof Strategy

README 只放 3 层证据：

1. **一条最强结论**
   - 20-run baseline 中最高频的 4 个问题
2. **一个旗舰例子**
   - ambiguity-before vs reflection-after
3. **一个证据入口**
   - `dogfood/baseline.md`

README 不做的事：
- 不塞全部 20 条样本
- 不完整展开所有 11 招
- 不把 README 写成研究报告

## Messaging Rules

### Must say
- Catch ambiguity before you hit Enter / 按 Enter 之前，把含混照出来
- 当前是首轮 20-run precision baseline
- `/照` 是 reflection，不是 rewrite
- 不改写、不打分、不编数字

### Must not say
- external validity 已经成立
- recall 已经成立
- adoption 已经证明 detector quality
- 泛化到所有 prompt 类型都成立

## CTA Hierarchy

### Primary
Try `/照`

### Secondary
Star / Follow / Contribute / Share cases

顺序必须是：
1. 先试用
2. 再建立信任
3. 最后社区转化

## What to Remove or Compress

1. 删除“中文一块 + 英文一块”的大块重复结构
2. 压缩 Roadmap 的存在感，不抢首屏注意力
3. FAQ 放到底部，不在上半屏解释过多
4. 安装和使用保留，但只保留最小可用信息
5. 11 条规则保留概览，不在首页展开成解释性长文

## Acceptance Criteria

1. 首屏 10 秒内能回答：
   - 这是什么
   - 为什么值得试
   - 我现在怎么试
2. Proof、Method、Install、Roadmap 不再互相抢注意力
3. 中文和英文不再是两套叙事
4. README 中所有关于 baseline 的表述都与 `dogfood/baseline.md` 一致
5. README 的主转化是试 `/照`，不是先读完说明书
6. Secondary CTA 不早于 Primary CTA
7. 整体风格：短、密、高信息量，不写成长篇说明文
