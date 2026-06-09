import { describe, expect, it } from 'vitest'
import {
  CATEGORY_ORDER,
  MODE_ORDER,
  RULE_PRIORITY,
  type ArtifactInput,
  type GapFinding
} from '../../engine/contracts'

describe('engine contracts', () => {
  it('defines the approved handoff modes and output priority order', () => {
    const artifactInput: ArtifactInput = {
      mode: 'self-check',
      inputKind: 'technical-plan',
      rawText: 'Ship the handoff checker.',
      lines: ['Ship the handoff checker.']
    }

    const gapFinding: GapFinding = {
      ruleCode: 'R-DOD',
      publicCategory: 'completion-acceptance-gap',
      severity: 'blocking',
      anchor: {
        lineStart: 1,
        lineEnd: 1,
        quote: 'Ship the handoff checker.'
      },
      gap: 'Definition of done is missing.',
      downstreamRisk: 'Reviewers may disagree about completion.',
      evidenceType: 'contextual-inference',
      fillInDirection: 'Add explicit acceptance criteria.'
    }

    expect(MODE_ORDER).toEqual(['self-check', 'receiver-check'])
    expect(CATEGORY_ORDER).toEqual([
      'completion-acceptance-gap',
      'boundary-failure-gap',
      'terminology-definition-gap',
      'method-constraint-dependency-gap'
    ])
    expect(RULE_PRIORITY).toEqual([
      'R-DOD',
      'V-STAKE',
      'V-NAME',
      'I-SSOT',
      'G-NOGO',
      'I-ADR',
      'S-PERF',
      'S-QUANT',
      'S-NFR',
      'G-WHY',
      'V-LAYER'
    ])
    expect(artifactInput.lines).toEqual(['Ship the handoff checker.'])
    expect(gapFinding.anchor.quote).toBe('Ship the handoff checker.')
  })
})
