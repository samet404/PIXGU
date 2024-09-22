import { create } from 'zustand'

type Value =
  | {
      status: 'painterSelectedTheme'
      themes: [string, string]
      selectedTheme: string
    }
  | {
      status: 'painterSelectingTheme'
      themes: [string, string]
      timeIsUpTimeout: ReturnType<typeof setTimeout>
    }
  | {
      status: 'waitingForPlayers'
    }

type State = {
  value: Value
}

type Action = {
  set: (input: Value) => void
  reset: () => void
}

const initValue: State = {
  value: {
    status: 'waitingForPlayers',
  },
}

export const useHostPainterData = create<State & Action>((set, get) => ({
  ...initValue,

  set: (input) =>
    set({
      value: input,
    }),
  reset: () => {
    const value = get().value
    if (value.status === 'painterSelectingTheme' && value.timeIsUpTimeout)
      clearTimeout(value.timeIsUpTimeout)
    set(initValue)
  },
}))
