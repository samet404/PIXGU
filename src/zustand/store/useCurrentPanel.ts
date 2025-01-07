import { create } from 'zustand'

const initState: State = {
  currentPanel: null
}

type Panel = 'power-ups' | null

export const useCurrentPanel = create<State & Action>((set, get) => ({
  ...initState,

  setPanel: (panel: Panel) => set({ currentPanel: panel }),
  reset: () => set({ ...initState })
}))

type State = {
  currentPanel: Panel
}

type Action = {
  setPanel: (panel: Panel) => void
  reset: () => void
}