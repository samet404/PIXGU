import type { Guest } from '@/types'
import type { User } from 'lucia'
import { createStore } from 'zustand'

export type MyUserInfoForRoomStoreState = {
  user:
    | ({
        type: 'guest'
      } & Guest)
    | ({
        type: 'user'
      } & User)
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
