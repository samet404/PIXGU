import { create } from 'zustand'

type State = {
  playersIDs: string[]
  count: number
}

type Action = {
  add: (userID: string) => void
  isSpectator: (userID: string) => boolean
  reset: () => void
}

const initValue: State = { playersIDs: [], count: 0 }

export const useSpectators = create<State & Action>((set, get) => ({
  ...initValue,

  add: (userID) =>
    set({
      playersIDs: [...get().playersIDs, userID],
      count: get().count + 1,
    }),
  isSpectator: (userID) => get().playersIDs.includes(userID),
  reset: () => set(initValue),
}))
