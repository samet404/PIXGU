import { mToMs } from '@/utils/mToMs'
import { createMatch } from 'src/funcs/createMatch'
import { create } from 'zustand'

type State = {
  value: {
    matchTimeout: ReturnType<typeof setTimeout> | null
    isFirstMatch: boolean
    matchCount: number
    lastMatchStartedAt: number | null
  }
}
type Action = {
  newMatch: () => void
  setTimeout: (input: { roomID: string }) => void
  cancel: () => void
  reset: () => void
}

const initValue: State = {
  value: {
    matchTimeout: null,
    isFirstMatch: true,
    matchCount: 0,
    lastMatchStartedAt: null,
  },
}

export const useMatchStatus = create<State & Action>((set, get) => ({
  ...initValue,

  newMatch: () => {
    set({
      value: {
        matchCount: get().value.matchCount + 1,
        matchTimeout: null,
        isFirstMatch: false,
        lastMatchStartedAt: Date.now(),
      },
    })
  },

  setTimeout: ({ roomID }) => {
    if (get().value.matchTimeout) clearInterval(get().value.matchTimeout!)
    set({
      value: {
        matchCount: get().value.matchCount,
        matchTimeout: setTimeout(() => createMatch(roomID), mToMs(4)),
        isFirstMatch: false,
        lastMatchStartedAt: get().value.lastMatchStartedAt,
      },
    })
  },

  cancel: () => {
    const matchTimeout = get().value.matchTimeout
    if (matchTimeout) clearInterval(matchTimeout)
    set({
      value: {
        matchCount:
          get().value.matchCount !== 0 ? get().value.matchCount - 1 : 0,
        matchTimeout: null,
        isFirstMatch: get().value.matchCount === 1,
        lastMatchStartedAt: get().value.lastMatchStartedAt,
      },
    })
  },

  get: () => get(),
  reset: () => {
    const matchTimeout = get().value.matchTimeout
    if (matchTimeout) clearInterval(matchTimeout)
    set(initValue)
  },
}))
