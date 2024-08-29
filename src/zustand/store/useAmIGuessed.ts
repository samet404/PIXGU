import { create } from 'zustand'

type State = {
  amIGuessed: boolean
}

type Action = {
  iGuessed: () => void
  noIMNotGuessed: () => void
  reset: () => void
}

const initValue: State = {
  amIGuessed: false,
}

export const useAmIGuessed = create<State & Action>((set, get) => ({
  ...initValue,

  iGuessed: () =>
    set({
      amIGuessed: true,
    }),

  noIMNotGuessed: () =>
    set({
      amIGuessed: false,
    }),
  reset: () => set(initValue),
}))
