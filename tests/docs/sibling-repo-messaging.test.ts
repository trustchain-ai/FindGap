import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'

const action = readFileSync('/Users/lihu/WorkSpace/ai/FindAction/README.md', 'utf8')
const miss = readFileSync('/Users/lihu/WorkSpace/ai/FindMiss/README.md', 'utf8')

describe('sibling repo messaging', () => {
  it('marks sibling repos as roadmap/experimental and points to FindGap', () => {
    expect(action).toContain('Experimental')
    expect(action).toContain('FindGap')
    expect(miss).toContain('Experimental')
    expect(miss).toContain('FindGap')
  })
})
