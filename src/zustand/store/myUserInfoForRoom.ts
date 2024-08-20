import type { User } from 'lucia'
import { createStore } from 'zustand'

export type MyUserInfoForRoomStoreState = {
  user: User
}

// export type MyUserInfoForRoomStoreAction = {}

export type MyUserInfoForRoomStore = MyUserInfoForRoomStoreState
// & MyUserInfoForRoomStoreAction

export const createMyUserInfoForRoomStore = (
  initState: MyUserInfoForRoomStoreState,
) =>
  createStore<MyUserInfoForRoomStore>((set, get) => ({
    ...initState,
  }))
