# Example · V-LAYER · 抽象层 / 颗粒度错配（鸡同鸭讲根源）

> **来源**：本仓真实历史命中（v0.5 时期，使用当时的 PASS/FAIL 方法论）。
> 原案例来自 v0.5 草案对话过程（用户原话："鸡同鸭讲、对牛弹琴"）。
> v0.6 已砍掉 PASS/FAIL，输出格式改为三节点（照→查→亮）。下方保留历史原貌。

---

## 场景

在 v0.5 规划的第 3 轮 workflow 中，照妖镜给出的方案这样写：

```
v0.5 = 一份方法论 manifesto，不是一个工具。

形态：
zhaoyaojing/
├── PRINCIPLES.md     # 编号原则 ≤12 条
├── VOCABULARY.md     # 共享词汇表
└── adapters/
    └── claude-skill.md
```

用户立即拒绝：**"我不太认可这个方向。1、我们不做平台，一定是小而美。"**

---

## 照妖镜输出

```
[FAIL] V-LAYER 抽象层/颗粒度错配
  file: workflow-output:phase-3-manifesto-section
  原形: "v0.5 = 一份方法论 manifesto" + "VOCABULARY.md 共享词汇表"
  why : 用户在 What 层（"消除 gap 让协作顺畅"），方案在 How+Form 层
        （manifesto / 词汇表 / 12 条原则）
        用户问的是"做哪件事"，方案答的是"用什么形态"
        鸡同鸭讲——双方各自层的话都对，但层不对就无法对齐
  补齐: 1) 先在 Why 层确认："消除 80% 返工 → 推动 agent 落地" 是不是用户的 Why
        2) 再在 What 层对齐："识别 ROI Top 20% Gap 并照出原形" 是不是用户的 What
        3) 最后才进 How 层："11 条 grep 规则" 是 What 的一种 How
```

---

## 真实修复

用户给出 4 次方向校正（dogfood/runs/003-self-v05-decision.md 完整记录），方案从 manifesto → handoff 包 → 7 招 → 11 招逐步收敛。

修复信号：用户回复"对齐了，可以跑起来了"——抽象层达到一致。

---

## 给上游的认知盲点

**"我说做 X，但其实是为了 Y"**——这是抽象层错配的典型表现。
PM 说"提升留存"，工程师追问"加哪个字段"——双方都没错，但在不同层。
不在同一层对齐，沟通永远是平行线。

**判定方法**：检查同一段内是否同时出现战略词（消除/澄清/对齐/赋能）+ 实现词（字段/接口/grep/schema）——若是，疑似 V-LAYER 命中。
