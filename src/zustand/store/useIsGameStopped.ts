import { create } from 'zustand'

type Code = 'connectingToHost' | 'waitingForHost' | 'waitingForPlayers'

type State = {
  value:
  | {
    isStopped: true
    code: Code[]
  }
  | {
    isStopped: false
    code: null
  }
}

type Action = {
  removeCode: (code: Code) => void
  addCode: (code: Code) => void
  reset: () => void
}

const initState: State = {
  value: {
    isStopped: true,
    code: ['connectingToHost', 'waitingForPlayers', 'waitingForHost'],
  },
}

export const useIsGameStopped = create<State & Action>((set, get) => ({
  ...initState,

  removeCode: (code) => {
    if (!get().value.isStopped) return
    if (get().value.code?.length === 1) {
      set({
        value: { isStopped: false, code: null },
      })
      return
    }

    set({
      value: {
        isStopped: true,
        code: (get().value.code ?? []).filter((c) => c !== code),
      },
    })
  },

  addCode: (code) => {
    set({
      value: {
        ...get(),
        isStopped: true,
        code: [code, ...(get().value.code ?? [])],
      },
    })


  },
  reset: () => set(initState),
}))
