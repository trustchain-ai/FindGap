import { describe, expect, it } from 'vitest'
import { parseArtifact } from '../../engine/parser'
import { detectRuleHits } from '../../engine/detector'
import { applySeverity } from '../../engine/severity'

describe('handoff priority rules', () => {
  it('detects missing acceptance, failure-path, and no-go boundaries', () => {
    const artifact = parseArtifact({
      mode: 'self-check',
      rawText: [
        '目标：支持先买后付结账能力',
        '范围：先做印尼',
        '上线尽快'
      ].join('\n')
    })

    const hits = applySeverity(detectRuleHits(artifact))
    const ruleDod = hits.find(hit => hit.ruleCode === 'R-DOD')
    const ruleStake = hits.find(hit => hit.ruleCode === 'V-STAKE')
    const ruleNoGo = hits.find(hit => hit.ruleCode === 'G-NOGO')

    expect(hits.map(hit => hit.ruleCode)).toEqual(
      expect.arrayContaining(['R-DOD', 'V-STAKE', 'G-NOGO'])
    )
    expect(ruleDod?.severity).toBe('blocking')
    expect(ruleStake?.severity).toBe('warning')
    expect(ruleNoGo?.severity).toBe('warning')
    expect(ruleDod?.publicCategory).toBe('completion-acceptance-gap')
    expect(ruleStake?.publicCategory).toBe('boundary-failure-gap')
    expect(ruleNoGo?.publicCategory).toBe('boundary-failure-gap')
    expect(ruleDod?.evidenceType).toBe('insufficient-information')
    expect(ruleStake?.evidenceType).toBe('insufficient-information')
    expect(ruleNoGo?.evidenceType).toBe('insufficient-information')
  })

  it('does not emit R-DOD when acceptance text exists', () => {
    const artifact = parseArtifact({
      mode: 'self-check',
      rawText: [
        '目标：支持先买后付结账能力',
        '验收：用户完成结账后显示成功页',
        '范围：先做印尼'
      ].join('\n')
    })

    const hits = applySeverity(detectRuleHits(artifact))

    expect(hits.map(hit => hit.ruleCode)).not.toContain('R-DOD')
  })
})
