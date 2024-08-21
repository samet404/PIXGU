import type { DarkZoneChatFromHost, YourDarkZoneChatFromHost } from '@/types'
import { create } from 'zustand'

type State = {
  msgs: Msg[]
}

type Action = {
  add: (data: Msg) => void
  reset: () => void
}

export const useDarkZoneChatMsgsStore = create<State & Action>((set) => ({
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

type Msg =
  | ({ myMsg: false } & Pick<DarkZoneChatFromHost, 'data'>)
  | ({ myMsg: true } & Pick<YourDarkZoneChatFromHost, 'data'>)
