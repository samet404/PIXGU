import type { Guest } from '@/types'
import { createStore } from 'zustand'

export type MyUserInfoForRoomStoreState = {
  user: Guest
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
