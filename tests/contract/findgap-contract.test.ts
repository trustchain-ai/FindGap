import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'

const skill = readFileSync('skill/FindGap.skill.md', 'utf8')
const manifest = readFileSync('manifest.json', 'utf8')
const readme = readFileSync('README.md', 'utf8')

describe('FindGap 1.0.0 contract', () => {
  it('locks handoff-time positioning and dual modes', () => {
    expect(skill).toContain('1.0.0')
    expect(skill).toContain('Self-check')
    expect(skill).toContain('Receiver-check')
    expect(skill).toContain('交接')
    expect(skill).not.toContain('跨模型验证')

    expect(manifest).toContain('1.0.0')
    expect(manifest).toContain('交接点 Gap 校对器')
    expect(manifest).toContain('handoff 前识别 owner 和 receiver 都可能忽略的高成本 gap')
    expect(manifest).toContain('最大化 ROI')

    expect(readme).toContain('0.9805')
    expect(readme).toContain('handoff')
    expect(readme).toContain('Self-check')
    expect(readme).toContain('Receiver-check')
    expect(readme).toContain('Quickstart')
    expect(readme).toContain('How it works')
    expect(readme).toContain('not')
    expect(readme).toContain('per-turn prompt checker')
    expect(readme).toContain('Who it is for')
    expect(readme).toContain('Why it matters')
    expect(readme).toContain('Evidence you can trust')
  })
})
