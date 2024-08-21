import { createStore } from 'zustand'

export type UserIDStoreState = { userID: string }

export type UserIDStoreAction = {
  get: () => string
}

export type UserIDStore = UserIDStoreState & UserIDStoreAction

export const createUserIDStore = (initState: UserIDStoreState) =>
  createStore<UserIDStore>((set, get) => ({
    ...initState,

    get: () => get().userID,
  }))
