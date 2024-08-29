import type { PausedGameCode } from '@/types/pausedGameCode '
import { create } from 'zustand'

type State =
  | {
      isPaused: true
      code: PausedGameCode
    }
  | {
      isPaused: false
      code: null
    }

type Action = {
  set: (input: State) => void
  get: () => State
  reset: () => void
}

export const useIsGamePaused = create<State & Action>((set, get) => ({
  isPaused: true,
  code: 'connectingHost',

  get: () => get(),

  set: (input) =>
    set({
      ...input,
    }),

  reset: () =>
    set({
      isPaused: true,
      code: 'connectingHost',
    }),
}))
