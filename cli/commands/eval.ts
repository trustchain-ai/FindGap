import { RULE_COVERAGE_CASES } from '../../tests/fixtures/rule-coverage/cases.js'
import { runFixtureSuite } from '../../eval/runner.js'

export function runEvalCommand() {
  return runFixtureSuite(RULE_COVERAGE_CASES)
}
