'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import {
  type MyUserInfoForRoomStore,
  type MyUserInfoForRoomStoreState,
  createMyUserInfoForRoomStore,
} from '@/zustand/store'

export type MyUserInfoForRoomStoreApi = ReturnType<
  typeof createMyUserInfoForRoomStore
>

export const MyUserInfoForRoomStoreContext = createContext<
  MyUserInfoForRoomStoreApi | undefined
>(undefined)

export type MyUserInfoForRoomStoreProviderProps = {
  children: ReactNode
  initState: MyUserInfoForRoomStoreState
}

export const MyUserInfoForRoomStoreProvider = ({
  initState,
  children,
}: MyUserInfoForRoomStoreProviderProps) => {
  const storeRef = useRef<MyUserInfoForRoomStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createMyUserInfoForRoomStore(initState)
  }

  return (
    <MyUserInfoForRoomStoreContext.Provider value={storeRef.current}>
      {children}
    </MyUserInfoForRoomStoreContext.Provider>
  )
}

export const useMyUserInfoForRoomStore = <T,>(
  selector: (store: MyUserInfoForRoomStore) => T,
): T => {
  const userIDStoreContext = useContext(MyUserInfoForRoomStoreContext)

  if (!userIDStoreContext) {
    throw new Error(
      `useMyUserInfoForRoomStore must be used within MyUserInfoForRoomStoreProvider`,
    )
  }

  return useStore(userIDStoreContext, selector)
}
