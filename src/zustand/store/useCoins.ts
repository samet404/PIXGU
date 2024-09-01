import { create } from 'zustand'

type UserID = string
type State = {
  coins: Record<UserID, number>
}

type Action = {
  add: (userID: string, amount: number) => void
  get: (userID: string) => number
  reset: () => void
}

const initValue: State = {
  coins: {},
}

export const useCoins = create<State & Action>((set, get) => ({
  ...initValue,

  add: (userID, amount) =>
    set({
      coins: {
        ...get().coins,
        [userID]: amount,
      },
    }),

  get: (userID) => get().coins[userID] ?? 0,
  reset: () => set(initValue),
}))
