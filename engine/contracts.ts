export const MODE_ORDER = ['self-check', 'receiver-check'] as const
export type FindGapMode = (typeof MODE_ORDER)[number]

export const CATEGORY_ORDER = [
  'completion-acceptance-gap',
  'boundary-failure-gap',
  'terminology-definition-gap',
  'method-constraint-dependency-gap'
] as const
export type PublicCategory = (typeof CATEGORY_ORDER)[number]

export const RULE_PRIORITY = [
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
] as const
export type RuleCode = (typeof RULE_PRIORITY)[number]

export type Severity = 'blocking' | 'warning' | 'defer'
export type EvidenceType = 'public-evidence' | 'contextual-inference' | 'insufficient-information'
export type InputKind = 'one-line-request' | 'technical-plan' | 'prd-fragment' | 'decision-request' | 'unknown'

export interface SourceAnchor {
  lineStart: number
  lineEnd: number
  quote: string
}

export interface ArtifactInput {
  mode: FindGapMode
  inputKind: InputKind
  rawText: string
  lines: string[]
}

export interface GapFinding {
  ruleCode: RuleCode
  publicCategory: PublicCategory
  severity: Severity
  anchor: SourceAnchor
  gap: string
  downstreamRisk: string
  evidenceType: EvidenceType
  fillInDirection?: string
}
