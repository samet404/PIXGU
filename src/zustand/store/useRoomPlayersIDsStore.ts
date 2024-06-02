import { create } from 'zustand'

type State = { IDs: string[] }

type Action = {
  update: (newIDs: string[]) => void
  reset: () => void
}

export const useRoomPlayersIDsStore = create<State & Action>((set) => ({
  IDs: [],

  update: (newIDs) => set((s) => ({ IDs: [...newIDs] })),
  reset: () => set({ IDs: [] }),
}))
