import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'

function read(path: string) {
  return readFileSync(path, 'utf8')
}

describe('soft copyright docs', () => {
  it('creates the required supporting documents', () => {
    expect(read('docs/user-manual.md')).toContain('软件说明书')
    expect(read('docs/architecture.md')).toContain('系统架构')
    expect(read('docs/originality.md')).toContain('原创性声明')
  })
})
