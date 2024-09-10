import { create } from 'zustand'

type State = { value: Set<string> }

type Action = {
  add: (userID: string) => void
  isBroken: (userID: string) => boolean
  reset: () => void
}

export const useBrokenUserPfps = create<State & Action>((set, get) => ({
  value: new Set<string>([]),
  add: (userID) => get().value.add(userID),
  isBroken: (userID) => get().value.has(userID),
  reset: () => set({ value: new Set<string>([]) }),
}))
