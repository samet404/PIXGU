import type { GuessChatFromHost, YourGuessChatFromHost } from '@/types'
import { create } from 'zustand'

type State = {
  msgs: Msg[]
}

type Action = {
  add: (data: Msg) => void
  reset: () => void
}

export const useRoomGuessChatMsgsStore = create<State & Action>((set) => ({
  msgs: [],

  add: (data) => {
    set((state) => {
      const prev = (() => {
        const msgs = state.msgs
        if (msgs.length === 30) return msgs.slice(1, 30)
        return msgs
      })()

      return { msgs: [...prev, data] }
    })
  },

  reset: () => set({ msgs: [] }),
}))

export type Msg =
  | ({ myMsg: false } & Pick<GuessChatFromHost, 'data'>)
  | ({ myMsg: true } & Pick<YourGuessChatFromHost, 'data'>)
