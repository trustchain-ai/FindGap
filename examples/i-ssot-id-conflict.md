# Example · I-SSOT · SSOT 缺失 / 术语漂移

> **来源**：本仓真实历史命中。本案例来自照妖镜 v0.3 的 Gap ID 体系自相矛盾问题（dogfood/runs/001-self-v03-bootstrap.md Finding #1，G14.S）。

---

## 场景

照妖镜 v0.3 的 ID 体系出现**两套互不兼容**的定义：

**manifest.json:103**
```json
"gapIdFormat": "G{family}-{idx}#{shortHash} | shortHash=sha1(location+evidence)[0:6]"
```

**SKILL.md:407**（同一项目内）
```
family: 如 SEC（安全）、PERF（性能）、LOGIC（逻辑）、UX（体验）...
```

两处都自称是"权威"，但用户按 manifest 写 `G14.M-1#a3f91c`，按 SKILL 文档写 `GSEC-1#a3f91c`，**两套调用方式都能找到依据**。

---

## 照妖镜输出

```
[FAIL] I-SSOT SSOT 缺失 / 版本术语漂移
  file: manifest.json:103 ↔ skill/照妖镜.skill.md:407
  原形: manifest:"G{family}-{idx}#{shortHash} family=G1-G14"
        SKILL:  "family: SEC/PERF/LOGIC/UX/..."
  why : 同一字段（gap ID 的 family）在 ≥2 处定义不一致
        feedback.jsonl 历史记录的 ID 无法跨版本检索
        用户被迫学两套规则，且无法判断哪套是真相
  补齐: 1) 钉死单一权威源：manifest.json 是 ID 体系唯一权威
        2) SKILL.md 移除 SEC/PERF/LOGIC 等业务域码示例
        3) 提供 v0.3 → v0.4 ID 迁移映射表，历史 feedback 透明转换
```

---

## 真实修复

v0.4 commit `2061e03` 已：
- SKILL.md L393-465 统一 ID 格式
- manifest.json `gapIdFormat` 字段加注 "family ∈ G1-G18 子项码"
- 新增 v0.3→v0.4 ID 迁移映射表（8 条业务域码 → 维度码）

**注**：v0.5 已进一步把 ID 体系整体砍掉（红线 1 PASS/FAIL 二值），所以 I-SSOT 规则现在反过来拦的是 ROADMAP / 文档中的术语漂移——而不是 ID 系统本身。

---

## 给上游的认知盲点

**"我以为只有一处定义"是 SSOT 失效的最大根源**。
同一概念在不同文件叫不同名字、或同名指不同物——是跨团队鸡同鸭讲的根本原因。
SSOT 不是高大上的架构原则，是"改一处全同步"的最低门槛。
