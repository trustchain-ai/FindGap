import type { FindGapMode, RuleCode } from '../../../engine/contracts'

export interface RuleCoverageCase {
  name: string
  mode: FindGapMode
  text: string
  expectedRule: RuleCode
}

const makeCases = (rule: RuleCode, cases: string[]): RuleCoverageCase[] =>
  cases.map((text, index) => ({
    name: `${rule}-${index + 1}`,
    mode: index % 2 === 0 ? 'self-check' : 'receiver-check',
    text,
    expectedRule: rule
  }))

export const RULE_COVERAGE_CASES: RuleCoverageCase[] = [
  ...makeCases('R-DOD', [
    '目标：支持 BNPL 结账能力\n范围：先做印尼\n上线尽快',
    '方案：改造退款流程\n依赖：Portal 2.0\n排期：本周内',
    '需求：支持关单机制\n涉及角色：收银员'
  ]),
  ...makeCases('V-STAKE', [
    '目标：统一支付结果上报\n验收：上线成功',
    '方案：合并渠道回调\n范围：先支持 Doku',
    '需求：修复串口打印超时\n完成标准：不再白屏'
  ]),
  ...makeCases('V-NAME', [
    '支持 BNPL 结账能力\n验收：成功展示',
    '支持 settlement 查询\n范围：印尼商户',
    '对接 capture 流程\n完成标准：接口可调用'
  ]),
  ...makeCases('I-SSOT', [
    '接口以 portal 字段为准\n验收：字段对齐',
    '账单展示以 MIS 为准\n上线尽快',
    '订单状态以渠道回调为准\n处理人：后端'
  ]),
  ...makeCases('G-NOGO', [
    '目标：同时提高成功率、降低成本、缩短开发周期',
    '方案：先做印尼渠道接入\n上线尽快',
    '需求：支持全部钱包方式\n范围：后续再说'
  ]),
  ...makeCases('I-ADR', [
    '先接 Doku，再接其他渠道',
    '采用 portal 字段模型作为标准',
    '先上静态码，再考虑动态码'
  ]),
  ...makeCases('S-PERF', [
    '性能要好，体验流畅',
    '接口响应要快',
    '页面打开要稳定且迅速'
  ]),
  ...makeCases('S-QUANT', [
    '支持所有支付方式',
    '任何异常都要处理',
    '全部状态都要同步'
  ]),
  ...makeCases('S-NFR', [
    '系统必须稳定可靠',
    '要保证安全合规',
    '流程需要健壮'
  ]),
  ...makeCases('G-WHY', [
    '改造结账流程\n交付时间：本周',
    '支持新渠道接入\n验收：接口联通',
    '新增 Portal 字段\n责任人：前端'
  ]),
  ...makeCases('V-LAYER', [
    '业务上统一账单语义，实现上沿用旧字段，接口按新名返回',
    '产品定义退款成功，技术上只记录 processing，运营按成功口径展示',
    '结账体验保持一致，接口分层暂不统一，文档按新结构描述'
  ])
]
