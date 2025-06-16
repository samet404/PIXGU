'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import {
  type UserIDStore,
  type UserIDStoreState,
  createUserIDStore,
} from '@/zustand/store/userID'

export type UserIDStoreApi = ReturnType<typeof createUserIDStore>

export const UserIDStoreContext = createContext<UserIDStoreApi | undefined>(
  undefined,
)

export type UserIDStoreProviderProps = {
  children: ReactNode
  initState: UserIDStoreState
}

export const UserIDStoreProvider = ({
  initState,
  children,
}: UserIDStoreProviderProps) => {
  const storeRef = useRef<UserIDStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createUserIDStore(initState)
  }

  return (
    <UserIDStoreContext.Provider value={storeRef.current}>
      {children}
    </UserIDStoreContext.Provider>
  )
}

export const useUserIDStore = <T,>(selector: (store: UserIDStore) => T): T => {
  const userIDStoreContext = useContext(UserIDStoreContext)

  if (!userIDStoreContext) {
    throw new Error(`useUserIDStore must be used within UserIDStoreProvider`)
  }

  return useStore(userIDStoreContext, selector)
}
