import type { Powerup } from '@/types'
import { create } from 'zustand'


const initValue: State = {
  prevPowerups: null,
  powerups: {
    letterHint: 0,
    ai: 0,
  },
}

export const useOwnedPowerups = create<State & Action>((set, get) => ({
  ...initValue,

  add: (input: Powerup) => set({
    ...get(),
    powerups: {
      ...get().powerups,
      [input]: get().powerups[input] + 1
    },
  }),

  returnPrev: () => set({
    prevPowerups: null,
    powerups: {
      ...get().prevPowerups!,
    },
  }),

  set: (input) => set({
    ...get(),
    powerups: input,
  }),

  remove: (input: Powerup) => set({
    ...get(),
    powerups: {
      ...get().powerups,
      [input]: get().powerups[input] - 1
    },
  }),

  newMatch: () => set({
    prevPowerups: get().powerups,
    powerups: get().powerups
  }),


  reset: () => set({ ...initValue }),
}))


type State = {
  prevPowerups: Record<Powerup, number> | null
  powerups: Record<Powerup, number>
}

type Action = {
  set: (input: Record<Powerup, number>) => void
  returnPrev: () => void
  add: (input: Powerup) => void
  remove: (input: Powerup) => void
  newMatch: () => void
  reset: () => void
}