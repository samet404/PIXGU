import { createStore } from 'zustand'

export type UserIDStoreState = { userID: string }

export type UserIDStoreAction = {
  set: (input: string) => void
  get: () => string
}

export type UserIDStore = UserIDStoreState & UserIDStoreAction

export const createUserIDStore = (initState: UserIDStoreState) =>
  createStore<UserIDStore>((set, get) => ({
    ...initState,

    get: () => get().userID,
    set: (input) => {
      set({ userID: input })
    },
  }))
