import type { GapFinding } from './contracts.js'

export function classifyEvidence(findings: GapFinding[]): GapFinding[] {
  return findings.map(finding => {
    if (finding.ruleCode === 'I-SSOT') {
      return { ...finding, evidenceType: 'contextual-inference' as const }
    }
    return finding
  })
}
