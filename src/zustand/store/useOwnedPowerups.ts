import type { Powerup } from '@/types'
import { create } from 'zustand'


const initValue: State = {
  powerups: {
    letterHint: 0,
    ai: 0,
  },

  count: 0
}

export const useOwnedPowerups = create<State & Action>((set, get) => ({
  ...initValue,

  add: (input: Powerup) => set({
    ...get(),
    powerups: {
      ...get().powerups,
      [input]: get().powerups[input] + 1
    },
    count: get().count + 1
  }),

  remove: (input: Powerup) => set({
    ...get(),
    powerups: {
      ...get().powerups,
      [input]: get().powerups[input] - 1
    },
    count: get().count - 1
  }),


  reset: () => set({ ...initValue }),
}))


type State = {
  powerups: Record<Powerup, number>
  count: number
}



type Action = {
  add: (input: Powerup) => void
  remove: (input: Powerup) => void
  reset: () => void
}