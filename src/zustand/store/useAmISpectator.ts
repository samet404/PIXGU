import { create } from 'zustand'

type State = {
  amISpectator: boolean
}

type Action = {
  iAmSpectator: () => void
  noIMNotSpectator: () => void
  reset: () => void
}

const initValue: State = {
  amISpectator: false,
}

export const useAmISpectator = create<State & Action>((set, get) => ({
  ...initValue,

  iAmSpectator: () =>
    set({
      amISpectator: true,
    }),

  noIMNotSpectator: () =>
    set({
      amISpectator: false,
    }),
  reset: () => set(initValue),
}))
