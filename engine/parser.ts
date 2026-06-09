import type { ArtifactInput, FindGapMode, InputKind } from './contracts.js'

function detectInputKind(rawText: string, lineCount: number): InputKind {
  if (/PRD|需求|验收|范围|方案/u.test(rawText)) return 'technical-plan'
  if (/决策|trade-off|why/u.test(rawText)) return 'decision-request'
  if (lineCount <= 2) return 'one-line-request'
  return 'unknown'
}

export function parseArtifact(input: { mode: FindGapMode; rawText: string }): ArtifactInput {
  const lines = input.rawText.split('\n')
  return {
    mode: input.mode,
    inputKind: detectInputKind(input.rawText, lines.length),
    rawText: input.rawText,
    lines
  }
}
