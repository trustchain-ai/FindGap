import { describe, expect, it } from 'vitest'
import type { GapFinding } from '../../engine/contracts'
import { classifyEvidence } from '../../engine/evidence'
import { applyFallback } from '../../engine/fallback'
import { addFillInDirections } from '../../engine/advisor'

const finding: GapFinding = {
  ruleCode: 'R-DOD',
  publicCategory: 'completion-acceptance-gap',
  severity: 'blocking',
  anchor: { lineStart: 1, lineEnd: 1, quote: '支持 BNPL 结账能力' },
  gap: '缺少验收标准。',
  downstreamRisk: '下游无法判断是否完成。',
  evidenceType: 'insufficient-information'
}

describe('evidence, fallback, and advisor', () => {
  it('assigns evidence type, marks uncertainty, and adds fill-in direction', () => {
    const withEvidence = classifyEvidence([finding])
    const withFallback = applyFallback(withEvidence)
    const withAdvice = addFillInDirections(withFallback)

    expect(withAdvice[0].evidenceType).toBe('insufficient-information')
    expect(withAdvice[0].fillInDirection).toContain('补充')
  })
})
