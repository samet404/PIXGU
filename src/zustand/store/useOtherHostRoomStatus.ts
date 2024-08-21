import { create } from 'zustand'

type State = Partial<OtherRoomStatues>

type Action = {
  add: (input: Partial<OtherRoomStatues>) => void
  get: () => Partial<OtherRoomStatues>
  reset: () => void
}

const initValue = {
  matchInterval: null,
  isFirstMatch: true,
  theme: null,
} as const

export const useOtherHostRoomStatus = create<State & Action>((set, get) => ({
  ...initValue,

  add: (input) => {
    set({
      ...get(),
      ...input,
    })
  },
  get: () => get(),
  reset: () => set({ ...initValue }),
}))

export type OtherRoomStatues = {
  matchInterval: ReturnType<typeof setInterval> | null
  isFirstMatch: boolean
  theme: string | null
}
