import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'

const verifySkill = readFileSync('tests/verify-skill.md', 'utf8')
const changelog = readFileSync('CHANGELOG.md', 'utf8')
const roadmap = readFileSync('ROADMAP.md', 'utf8')
const contributing = readFileSync('CONTRIBUTING.md', 'utf8')

describe('doc sync', () => {
  it('documents the 1.0.0 handoff checker behavior', () => {
    expect(verifySkill).toContain('Self-check')
    expect(verifySkill).toContain('Receiver-check')
    expect(changelog).toContain('1.0.0')
    expect(roadmap).toContain('交接点')
    expect(contributing).toContain('TypeScript')
  })
})
