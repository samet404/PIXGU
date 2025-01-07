import { create } from 'zustand'

type State = {
  playersIDs: string[]
}

type Action = {
  guessed: (userID: string) => void
  isGuessed: (userID: string) => boolean
  reset: () => void
}

const initValue: State = { playersIDs: [] }

export const useGuessedPlayers = create<State & Action>((set, get) => ({
  ...initValue,

  guessed: (userID) =>
    set({
      playersIDs: [...get().playersIDs, userID],
    }),
  isGuessed: (userID) => get().playersIDs.includes(userID),
  reset: () => set({ ...initValue }),
}))
