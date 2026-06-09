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
    expect(readme).toContain('交接前最后一道认知校对')
    expect(readme).toContain('handoff')
    expect(readme).toContain('Self-check')
    expect(readme).toContain('Receiver-check')
    expect(readme).toContain('快速开始')
    expect(readme).toContain('工作原理')
    expect(readme).toContain('适合谁')
    expect(readme).toContain('为什么重要')
    expect(readme).toContain('可信的证据')
    expect(readme).toContain('所有者自检')
    expect(readme).toContain('接头人他检')
  })
})
