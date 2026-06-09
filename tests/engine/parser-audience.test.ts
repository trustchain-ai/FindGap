import { describe, expect, it } from 'vitest'
import { parseArtifact } from '../../engine/parser'
import { describePerspective } from '../../engine/audience'

describe('parser and audience', () => {
  it('classifies keyword-driven technical plans', () => {
    expect(
      parseArtifact({
        mode: 'self-check',
        rawText: 'PRD: checkout redesign'
      }).inputKind
    ).toBe('technical-plan')

    expect(
      parseArtifact({
        mode: 'self-check',
        rawText: '需求：支持 BNPL'
      }).inputKind
    ).toBe('technical-plan')

    expect(
      parseArtifact({
        mode: 'self-check',
        rawText: '验收：待补充'
      }).inputKind
    ).toBe('technical-plan')

    expect(
      parseArtifact({
        mode: 'self-check',
        rawText: '范围：先做印尼'
      }).inputKind
    ).toBe('technical-plan')

    expect(
      parseArtifact({
        mode: 'self-check',
        rawText: '方案：灰度发布'
      }).inputKind
    ).toBe('technical-plan')
  })

  it('classifies decision requests from decision keywords', () => {
    expect(
      parseArtifact({
        mode: 'self-check',
        rawText: '决策：是否拆分服务'
      }).inputKind
    ).toBe('decision-request')

    expect(
      parseArtifact({
        mode: 'self-check',
        rawText: 'trade-off: speed vs safety'
      }).inputKind
    ).toBe('decision-request')

    expect(
      parseArtifact({
        mode: 'self-check',
        rawText: 'why did we choose batch sync?'
      }).inputKind
    ).toBe('decision-request')
  })

  it('classifies short non-keyword input as one-line-request', () => {
    const input = parseArtifact({
      mode: 'self-check',
      rawText: '请帮我看一下\n今天先上线'
    })

    expect(input.inputKind).toBe('one-line-request')
    expect(input.lines).toHaveLength(2)
  })

  it('classifies longer non-keyword input as unknown', () => {
    const input = parseArtifact({
      mode: 'self-check',
      rawText: '先记录一下\n后面再看看\n暂时没有更多信息'
    })

    expect(input.inputKind).toBe('unknown')
    expect(input.lines).toHaveLength(3)
  })

  it('describes the owner perspective for self-check mode', () => {
    expect(describePerspective('self-check')).toEqual({
      role: 'owner',
      question: 'If I hand this off now, what will the next person misunderstand or need to ask back about?'
    })
  })

  it('describes the receiver perspective for receiver-check mode', () => {
    expect(describePerspective('receiver-check')).toEqual({
      role: 'receiver',
      question: 'If I receive this cold, what blocks me from executing correctly and confidently?'
    })
  })
})
