import type { FindGapMode } from './contracts.js'

export function describePerspective(mode: FindGapMode) {
  if (mode === 'self-check') {
    return {
      role: 'owner',
      question: 'If I hand this off now, what will the next person misunderstand or need to ask back about?'
    }
  }

  return {
    role: 'receiver',
    question: 'If I receive this cold, what blocks me from executing correctly and confidently?'
  }
}
