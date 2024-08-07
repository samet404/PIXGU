import type { User } from 'lucia'
import { create } from 'zustand'

type State = { players: UserData[] }

type Action = {
  add: (userData: UserData) => void
  remove: (userID: string) => void
  reset: () => void
}

export const useRoomPlayersDbInfo = create<State & Action>((set) => ({
  players: [],

  add: (userData) =>
    set((state) => ({
      players: [...state.players, userData],
    })),
  remove: (userID) =>
    set((state) => ({
      players: state.players.filter((player) => player.ID !== userID),
    })),
  reset: () => set({ players: [] }),
}))

type UserData = {
  ID: string
  usernameWithUsernameID: string
  profilePicture: string | null
}
