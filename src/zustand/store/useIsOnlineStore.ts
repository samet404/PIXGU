import { create } from 'zustand'

type State = { isOnline: boolean }

type Action = {
  change: (newIsOnline: boolean) => void
  reset: () => void
}

export const useIsOnlineStore = create<State & Action>((set) => ({
  isOnline: true,

  change: (newIsOnline) => set(() => ({ isOnline: newIsOnline })),
  reset: () => set({ isOnline: true }),
}))
