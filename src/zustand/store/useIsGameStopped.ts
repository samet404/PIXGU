import { create } from 'zustand'

type Code = 'connectingToHost' | 'waitingForHost' | 'waitingForPlayers'

type State = {
  value:
    | {
        isStopped: true
        code: Code
      }
    | {
        isStopped: false
        code: null
      }
}

type Action = {
  stop: (code: Code) => void
  open: () => void
  reset: () => void
}

const initState: State = {
  value: {
    isStopped: true,
    code: 'connectingToHost',
  },
}

export const useIsGameStopped = create<State & Action>((set, get) => ({
  ...initState,

  open: () =>
    set({
      value: { ...get().value, isStopped: false, code: null },
    }),

  stop: (code) =>
    set({
      value: { ...get(), isStopped: true, code },
    }),

  reset: () => set(initState),
}))
