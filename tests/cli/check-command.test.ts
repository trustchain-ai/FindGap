import { describe, expect, it } from 'vitest'
import { writeFileSync, mkdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { runCheckCommand } from '../../cli/commands/check.js'

describe('check command', () => {
  it('runs self-check on a markdown artifact', () => {
    const dir = '.tmp-tests'
    mkdirSync(dir, { recursive: true })
    const file = join(dir, 'artifact.md')
    writeFileSync(file, '目标：支持 BNPL\n范围：先做印尼\n上线尽快')

    const output = runCheckCommand({ filePath: file, mode: 'self-check' })

    expect(output).toContain('FindGap · 所有者自检 · 发现')
    expect(output).toContain('completion-acceptance-gap')

    rmSync(dir, { recursive: true, force: true })
  })
})
