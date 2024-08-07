import type { GuessChatFromHost } from '@/types'
import { create } from 'zustand'

type State = { msgs: Pick<GuessChatFromHost, 'data'>[] }

type Action = {
  add: (data: Pick<GuessChatFromHost, 'data'>) => void
  reset: () => void
}

export const useRoomWinnersChatMsgsStore = create<State & Action>((set) => ({
  msgs: [],

  add: (data) =>
    set((state) => ({
      msgs: [...state.msgs, data],
    })),

  reset: () => set({ msgs: [] }),
}))
