import { describe, expect, it } from 'vitest'
import type { GapFinding } from '../../engine/contracts'
import { formatFindings } from '../../engine/formatter'

const findings: GapFinding[] = [
  {
    ruleCode: 'R-DOD',
    publicCategory: 'completion-acceptance-gap',
    severity: 'blocking',
    anchor: { lineStart: 1, lineEnd: 1, quote: '支持 BNPL 结账能力' },
    gap: '缺少验收标准。',
    downstreamRisk: '下游无法判断是否完成。',
    evidenceType: 'insufficient-information',
    fillInDirection: '补充完成定义。'
  }
]

describe('formatter', () => {
  it('renders self-check output with mode label and guide question', () => {
    const output = formatFindings('self-check', findings)

    expect(output).toContain('所有者自检')
    expect(output).toContain('发现 1 处 gap 可能导致返工')
    expect(output).toContain('If I hand this off now')
    expect(output).toContain('原文："支持 BNPL 结账能力"')
    expect(output).toContain('下游风险：下游无法判断是否完成。')
    expect(output).toContain('依据类型：insufficient-information')
    expect(output).toContain('补齐方向：补充完成定义。')
    expect(output).not.toContain('PASS')
  })

  it('renders receiver-check output with receiver label and guide question', () => {
    const output = formatFindings('receiver-check', findings)

    expect(output).toContain('接头人他检')
    expect(output).toContain('If I receive this cold')
  })
})
