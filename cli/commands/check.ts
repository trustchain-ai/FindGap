import { readFileSync } from 'node:fs'
import { runFindGap } from '../../engine/index.js'
import type { FindGapMode } from '../../engine/contracts.js'

export function runCheckCommand(input: { filePath: string; mode: FindGapMode }) {
  const rawText = readFileSync(input.filePath, 'utf8')
  return runFindGap(input.mode, rawText).output
}
