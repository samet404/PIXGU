import { mToMs } from '@/utils/mToMs'
import { createMatch } from 'src/funcs/createMatch'
import { create } from 'zustand'

type State = {
  value: {
    matchInterval: ReturnType<typeof setInterval> | null
    isFirstMatch: boolean
    matchCount: number
    lastMatchStartedAt: number | null
  }
}
type Action = {
  startInterval: (roomID: string) => void
  cancelInterval: () => void
  clearInterval: () => void
  reset: () => void
}

const initValue: State = {
  value: {
    matchInterval: null,
    isFirstMatch: true,
    matchCount: 0,
    lastMatchStartedAt: null,
  },
}

export const useMatchStatus = create<State & Action>((set, get) => ({
  ...initValue,

  startInterval: (roomID) => {
    const state = get().value
    if (state.matchInterval) {
      clearInterval(state.matchInterval)
      console.log('interval cleared')
    }
    const startedAt = Date.now()
    set({
      value: {
        matchCount: get().value.matchCount + 1,
        matchInterval: setInterval(() => {
          const state = get().value
          const passedMs = Date.now() - startedAt
          console.log('passedMs in startInterval:', passedMs, {
            passedMs,
            state,
            startedAt,
            date: Date.now(),
          })

          if (passedMs >= mToMs(0.25)) {
            if (state.matchInterval) clearInterval(state.matchInterval)
            createMatch(roomID)
          }
        }, 1000),
        isFirstMatch: false,
        lastMatchStartedAt: startedAt,
      },
    })
  },

  cancelInterval: () => {
    const matchTimeout = get().value.matchInterval
    if (matchTimeout) clearInterval(matchTimeout)
    set({
      value: {
        matchCount:
          get().value.matchCount !== 0 ? get().value.matchCount - 1 : 0,
        matchInterval: null,
        isFirstMatch: get().value.matchCount === 1,
        lastMatchStartedAt: get().value.lastMatchStartedAt,
      },
    })
  },

  clearInterval: () => {
    const matchTimeout = get().value.matchInterval
    if (matchTimeout) clearInterval(matchTimeout)
    set({ ...get() })
  },
  get: () => get(),
  reset: () => {
    const matchInterval = get().value.matchInterval
    if (matchInterval) clearInterval(matchInterval)
    set(initValue)
  },
}))
