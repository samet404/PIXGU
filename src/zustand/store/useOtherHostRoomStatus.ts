import type { OtherRoomStatues } from '@/types/otherRoomStatues'
import { create } from 'zustand'

type State = { value: Partial<OtherRoomStatues> }

type Action = {
  add: (input: Partial<OtherRoomStatues>) => void
  get: () => Partial<OtherRoomStatues>
}

export const useOtherHostRoomStatus = create<State & Action>((set, get) => ({
  value: {},

  add: (input) => {
    get().value = {
      ...get().value,
      ...input,
    }
  },
  get: () => get().value,
}))
