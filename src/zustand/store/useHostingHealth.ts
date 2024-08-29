import { create } from 'zustand'

type Status =
  | 'loading'
  | 'networkError'
  | 'gameIsStarted'
  | 'waitingForPlayers'
  | 'readyToStart'

type State = {
  status: Status
}

type Action = {
  set: (input: Status) => void
  reset: () => void
}

const initState: State = {
  status: 'loading',
}

export const useHostingHealth = create<State & Action>((set, get) => ({
  ...initState,

  set: (input: Status) => set({ status: input }),
  reset: () => set(initState),
}))
