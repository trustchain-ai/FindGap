import { runFindGap } from '../engine/index.js'
import type { RuleCoverageCase } from '../tests/fixtures/rule-coverage/cases.js'

export function runFixtureSuite(cases: RuleCoverageCase[]) {
  return cases.map(testCase => {
    const result = runFindGap(testCase.mode, testCase.text)
    return {
      name: testCase.name,
      pass: result.findings.some(finding => finding.ruleCode === testCase.expectedRule)
    }
  })
}
