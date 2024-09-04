import { create } from 'zustand'
import { usePlayers } from './usePlayers'

type State = {
  playersIDs: string[]
}

type Action = {
  guessed: (userID: string) => void
  isGuessed: (userID: string) => boolean
  isEveryoneGuessed: () => boolean
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
  isEveryoneGuessed: () =>
    usePlayers.getState().value.count - 1 === get().playersIDs.length,
  reset: () => set(initValue),
}))
