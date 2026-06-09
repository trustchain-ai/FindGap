import { runEvalCommand } from './eval.js'
import { summarizeFixtureResults } from '../../eval/reporter.js'

export function runReportCommand() {
  return summarizeFixtureResults(runEvalCommand())
}
