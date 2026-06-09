import { describe, expect, it } from 'vitest'
import { runFixtureSuite } from '../../eval/runner'
import { RULE_COVERAGE_CASES } from '../fixtures/rule-coverage/cases'

describe('fixture suite', () => {
  it('executes all rule coverage cases', () => {
    const results = runFixtureSuite(RULE_COVERAGE_CASES)

    expect(results).toHaveLength(33)
    expect(results.every(result => result.pass)).toBe(true)
  })
})
