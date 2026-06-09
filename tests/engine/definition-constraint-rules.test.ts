import { describe, expect, it } from 'vitest'
import { parseArtifact } from '../../engine/parser'
import { detectRuleHits } from '../../engine/detector'

describe('definition and constraint rules', () => {
  it('detects terminology, ssot, decision, and dependency gaps', () => {
    const artifact = parseArtifact({
      mode: 'receiver-check',
      rawText: [
        '支持 BNPL 结账能力',
        '接口以 portal 字段为准',
        '性能要好，体验流畅',
        '先接 Doku，再接其他渠道'
      ].join('\n')
    })

    const hits = detectRuleHits(artifact)

    expect(hits.map(hit => hit.ruleCode)).toEqual(
      expect.arrayContaining(['V-NAME', 'I-SSOT', 'I-ADR', 'S-PERF'])
    )
  })
})
