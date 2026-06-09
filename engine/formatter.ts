import type { FindGapMode, GapFinding } from './contracts.js'
import { describePerspective } from './audience.js'

const ICONS = {
  blocking: '🔴',
  warning: '🟠',
  defer: '🟡'
} as const

const MODE_LABELS: Record<FindGapMode, string> = {
  'self-check': '所有者自检',
  'receiver-check': '接头人他检'
}

export function formatFindings(mode: FindGapMode, findings: GapFinding[]): string {
  const perspective = describePerspective(mode)
  const header = `FindGap · ${MODE_LABELS[mode]} · 发现 ${findings.length} 处 gap 可能导致返工`
  const guideQuestion = `> ${perspective.question}`

  const body = findings
    .map(finding => {
      return [
        `${ICONS[finding.severity]} ${finding.publicCategory}`,
        `原文："${finding.anchor.quote}"`,
        `缺口：${finding.gap}`,
        `下游风险：${finding.downstreamRisk}`,
        `依据类型：${finding.evidenceType}`,
        finding.fillInDirection ? `补齐方向：${finding.fillInDirection}` : ''
      ]
        .filter(Boolean)
        .join('\n')
    })
    .join('\n\n---\n\n')

  return [header, guideQuestion, '', '---', '', body].join('\n')
}
