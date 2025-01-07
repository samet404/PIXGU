import type { GuessChatFromHost, YourGuessChatFromHost } from '@/types'
import { create } from 'zustand'

type State = {
  myMsgCount: number
  msgs: Msg[]
}

type Action = {
  add: (data: Msg) => void
  reset: () => void
}

const initState: State = {
  msgs: [],
  myMsgCount: 0,
}

export const useRoomGuessChatMsgsStore = create<State & Action>((set) => ({
  ...initState,

  add: (data) => {
    set((s) => {
      const prev = (() => {
        const msgs = s.msgs
        if (msgs.length === 30) return msgs.slice(1, 30)
        return msgs
      })()

      return {
        myMsgCount: data.myMsg ? s.myMsgCount + 1 : s.myMsgCount,
        msgs: [...prev, data]
      }
    })
  },

  reset: () => set({ ...initState }),
}))

export type Msg =
  | ({ myMsg: false } & Pick<GuessChatFromHost, 'data'>)
  | ({ myMsg: true } & Pick<YourGuessChatFromHost, 'data'>)
