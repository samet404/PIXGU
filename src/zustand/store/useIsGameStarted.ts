import { create } from 'zustand'

type State = { isGameStarted: boolean }

type Action = {
  started: () => void
  reset: () => void
}

const initState: State = {
  isGameStarted: false,
}

export const useIsGameStarted = create<State & Action>((set, get) => ({
  ...initState,

  started: () => set({ isGameStarted: true }),
  reset: () => set(initState),
}))
