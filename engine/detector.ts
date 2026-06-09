import type { ArtifactInput, GapFinding, PublicCategory, RuleCode } from './contracts.js'

const RULE_CATEGORY: Record<RuleCode, PublicCategory> = {
  'R-DOD': 'completion-acceptance-gap',
  'V-STAKE': 'boundary-failure-gap',
  'V-NAME': 'terminology-definition-gap',
  'I-SSOT': 'terminology-definition-gap',
  'G-NOGO': 'boundary-failure-gap',
  'I-ADR': 'method-constraint-dependency-gap',
  'S-PERF': 'method-constraint-dependency-gap',
  'S-QUANT': 'method-constraint-dependency-gap',
  'S-NFR': 'method-constraint-dependency-gap',
  'G-WHY': 'completion-acceptance-gap',
  'V-LAYER': 'terminology-definition-gap'
}

const PERF_PATTERN = /性能要好|体验流畅|接口响应要快|页面打开/u

function firstMatchingLine(lines: string[], pattern: RegExp): string {
  return lines.find(line => pattern.test(line)) ?? ''
}

function finding(ruleCode: RuleCode, line: number, quote: string, gap: string, downstreamRisk: string): GapFinding {
  return {
    ruleCode,
    publicCategory: RULE_CATEGORY[ruleCode],
    severity: 'warning',
    anchor: { lineStart: line, lineEnd: line, quote },
    gap,
    downstreamRisk,
    evidenceType: 'insufficient-information'
  }
}

export function detectRuleHits(input: ArtifactInput): GapFinding[] {
  const findings: GapFinding[] = []
  const text = input.rawText
  const lines = input.lines

  if (!/验收|完成|done|通过标准/u.test(text)) {
    findings.push(
      finding(
        'R-DOD',
        1,
        lines[0] ?? '',
        '缺少可观察的完成定义或验收标准。',
        '下游会在不同完成标准下继续推进，导致返工。'
      )
    )
  }

  if (!/失败|异常|回滚|降级|受影响方/u.test(text)) {
    findings.push(
      finding(
        'V-STAKE',
        1,
        lines[0] ?? '',
        '缺少失败路径、回滚、降级或受影响方说明。',
        '下游在异常场景下会默认补脑，联调和验收时容易返工。'
      )
    )
  }

  if (!/不做|排除|优先级|先不/u.test(text)) {
    findings.push(
      finding(
        'G-NOGO',
        1,
        lines[0] ?? '',
        '缺少明确的不做项或边界约束。',
        '下游会扩大范围或误判优先级，造成额外返工。'
      )
    )
  }

  if (/BNPL|settlement|capture/u.test(text) && !/定义|指的是|期数|免息/u.test(text)) {
    findings.push(
      finding(
        'V-NAME',
        1,
        firstMatchingLine(lines, /BNPL|settlement|capture/u),
        '关键术语未定义，存在同名异义风险。',
        '下游可能按不同产品形态理解同一术语，导致接口或流程返工。'
      )
    )
  }

  if (/为准/u.test(text) && !/文档|链接|来源|SSOT/u.test(text)) {
    findings.push(
      finding(
        'I-SSOT',
        2,
        firstMatchingLine(lines, /为准/u),
        '提到了权威口径，但没有给出单一事实源。',
        '下游会在多个来源之间自行猜测，造成定义漂移。'
      )
    )
  }

  if (/先接|先上|选用|采用/u.test(text) && !/原因|为什么|trade-off/u.test(text)) {
    findings.push(
      finding(
        'I-ADR',
        4,
        firstMatchingLine(lines, /先接|先上|选用|采用/u),
        '关键决策缺少最小理由。',
        '下游无法判断何时坚持该决策、何时应该调整。'
      )
    )
  }

  if (PERF_PATTERN.test(text)) {
    findings.push(
      finding(
        'S-PERF',
        3,
        firstMatchingLine(lines, PERF_PATTERN),
        '性能或体验要求缺少可量化约束。',
        '下游无法据此设计或验收，会在联调时返工。'
      )
    )
  }

  if (/所有|任何|全部|每个/u.test(text)) {
    findings.push(
      finding(
        'S-QUANT',
        1,
        firstMatchingLine(lines, /所有|任何|全部|每个/u),
        '使用了无边界量词，缺少明确的数量约束或覆盖范围。',
        '下游会按最大化理解执行，造成范围蔓延或验收争议。'
      )
    )
  }

  if (/稳定|可靠|安全|健壮/u.test(text) && !PERF_PATTERN.test(text)) {
    findings.push(
      finding(
        'S-NFR',
        1,
        firstMatchingLine(lines, /稳定|可靠|安全|健壮/u),
        '非功能性要求缺少可量化的验收标准。',
        '下游无法设计测试用例，上线时无法客观判断是否达标。'
      )
    )
  }

  if (!/为什么|原因|目的|背景|stakes/u.test(text)) {
    findings.push(
      finding(
        'G-WHY',
        1,
        lines[0] ?? '',
        '缺少业务背景或决策动机说明。',
        '下游无法判断优先级或在方向偏移时自我纠偏。'
      )
    )
  }

  const layerKeywords = ['业务上', '实现上', '产品', '技术上', '运营', '接口', '分层']
  const matchedLayers = layerKeywords.filter(kw => text.includes(kw))
  if (matchedLayers.length >= 2) {
    findings.push(
      finding(
        'V-LAYER',
        1,
        lines[0] ?? '',
        '多个抽象层概念混用，缺少层级权威声明。',
        '下游在不同层级理解不一致时无法对齐，导致接口或流程返工。'
      )
    )
  }

  return findings
}
