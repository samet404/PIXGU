import type { PartialRecord, Powerup } from '@/types'
import { create } from 'zustand'

type State = {
  prices: Record<Powerup, number>
  ownedPowerups: {
    arr: {
      name: Powerup
      count: number
    }[]

    obj: PartialRecord<
      Powerup,
      {
        count: number
      }
    >
  }
}

type Action = {
  add: (powerup: Powerup, count: number) => void
  remove: (powerup: Powerup) => void
  reset: () => void
}

const initValue: State = {
  prices: {
    letterHint: 200,
    ai: 100,
    addTime: 100,
  },
  ownedPowerups: {
    obj: {},
    arr: [
      {
        name: 'letterHint',
        count: 2,
      },
      {
        name: 'ai',
        count: 2,
      },
    ],
  },
}

export const usePowerups = create<State & Action>((set, get) => ({
  ...initValue,

  remove: (powerup) => {
    delete get().ownedPowerups.obj[powerup]
    get().ownedPowerups.arr = get().ownedPowerups.arr.filter(
      (p) => p.name !== powerup,
    )

    set({
      ownedPowerups: get().ownedPowerups,
    })
  },
  add: (powerup, count) =>
    set({
      ownedPowerups: {
        arr: [
          ...get().ownedPowerups.arr,
          {
            name: powerup,
            count,
          },
        ],
        obj: {
          ...get().ownedPowerups.obj,
          [powerup]: {
            count,
          },
        },
      },
    }),
  reset: () => set(initValue),
}))
