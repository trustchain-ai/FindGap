import type { GapFinding, RuleCode, Severity } from './contracts.js'

const RULE_SEVERITY: Record<RuleCode, Severity> = {
  'R-DOD': 'blocking',
  'V-STAKE': 'warning',
  'V-NAME': 'warning',
  'I-SSOT': 'warning',
  'G-NOGO': 'warning',
  'I-ADR': 'warning',
  'S-PERF': 'warning',
  'S-QUANT': 'warning',
  'S-NFR': 'warning',
  'G-WHY': 'defer',
  'V-LAYER': 'defer'
}

export function applySeverity(findings: GapFinding[]): GapFinding[] {
  return findings.map(finding => ({
    ...finding,
    severity: RULE_SEVERITY[finding.ruleCode]
  }))
}
