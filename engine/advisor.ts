import type { GapFinding } from './contracts.js'

export function addFillInDirections(findings: GapFinding[]): GapFinding[] {
  return findings.map(finding => ({
    ...finding,
    fillInDirection: `补充与 ${finding.ruleCode} 对应的最小必要信息，供下游正确接手。`
  }))
}
