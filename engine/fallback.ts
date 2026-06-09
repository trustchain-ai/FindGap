import type { GapFinding } from './contracts.js'

export function applyFallback(findings: GapFinding[]): GapFinding[] {
  return findings.map(finding => {
    if (finding.evidenceType === 'insufficient-information') {
      return {
        ...finding,
        downstreamRisk: `${finding.downstreamRisk} 当前信息不足，需要显式澄清。`
      }
    }

    return finding
  })
}
