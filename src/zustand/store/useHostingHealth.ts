import { create } from 'zustand'

type Status =
  | 'gameIsStarted'
  | 'waitingForPlayers'
  | 'readyToStart'
  | 'gameEnded'

type State = {
  status: Status
}

type Action = {
  set: (input: Status) => void
  reset: () => void
}

const initState: State = {
  status: 'waitingForPlayers',
}

export const useHostingHealth = create<State & Action>((set, get) => ({
  ...initState,

  set: (input: Status) => set({ status: input }),
  reset: () => set(initState),
}))
