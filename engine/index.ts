import { parseArtifact } from './parser.js'
import { detectRuleHits } from './detector.js'
import { applySeverity } from './severity.js'
import { classifyEvidence } from './evidence.js'
import { applyFallback } from './fallback.js'
import { addFillInDirections } from './advisor.js'
import { formatFindings } from './formatter.js'
import type { FindGapMode } from './contracts.js'

export function runFindGap(mode: FindGapMode, rawText: string) {
  const artifact = parseArtifact({ mode, rawText })

  const detected = detectRuleHits(artifact)
  const scored = applySeverity(detected)
  const evidenced = classifyEvidence(scored)
  const guarded = applyFallback(evidenced)
  const findings = addFillInDirections(guarded)

  return {
    artifact,
    findings,
    output: formatFindings(mode, findings)
  }
}
