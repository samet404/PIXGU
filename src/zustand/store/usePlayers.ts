import type { User } from 'lucia'
import { filterObj } from '@/utils/filterObj'
import { create } from 'zustand'

export type Player = User

type UserID = string

type Players = {
  obj: Record<UserID, Player>
  arr: Player[]
  count: number
}

type State = { value: Players }

type Action = {
  addPlayer: (userID: string, player: Player) => void
  removePlayer: (userID: string) => void
  getPlayersIDs: () => string[]
  getPlayer: (userID: string) => Player | undefined
  get: () => Players
  reset: () => void
}

const initValue: State = {
  value: {
    obj: {},
    arr: [],
    count: 0,
  },
}

export const usePlayers = create<State & Action>((set, get) => ({
  ...initValue,

  get: () => get().value,
  removePlayer: (userID: string) => {
    set({
      value: {
        ...get().value,

        count: get().value.count - 1,
        obj: filterObj(get().value.obj, ([k, v]) => k !== userID) as Record<
          string,
          Player
        >,
        arr: get().value.arr.filter((p) => p.id !== userID),
      },
    })
  },
  changePlayer: (userID: string, player: Partial<Player>) => {
    const obj = {
      ...get().value.obj,
      [userID]: {
        ...get().value.obj[userID],
        ...player,
      },
    } as Record<UserID, Player>

    set({
      value: {
        ...get().value,
        obj,

        arr: Object.keys(obj).map((k) => {
          return {
            ...obj[k],
            id: k,
          } as Player
        }),
      },
    })
  },
  getPlayer: (userID: string) => get().value.obj[userID],
  addPlayer: async (userID, player) => {
    set({
      value: {
        ...get().value,
        count: get().value.count + 1,
        obj: {
          ...get().value.obj,
          [userID]: player,
        },
        arr: [...get().value.arr, player],
      },
    })

    const playersCount = usePlayers.getState().value.count
    if (playersCount === 1) {
      const { useIsGameStopped } = await import('@/zustand/store')
      useIsGameStopped.getState().stop('waitingForHost')
    }
  },
  getPlayersIDs: () => Object.keys(get().value.obj),
  reset: () => set(initValue),
}))
