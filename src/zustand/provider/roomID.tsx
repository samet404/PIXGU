'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import {
  type RoomIDStore,
  type RoomIDStoreState,
  createRoomIDStore,
} from '@/zustand/store/useRoomID'

export type RoomIDStoreApi = ReturnType<typeof createRoomIDStore>

export const RoomIDStoreContext = createContext<RoomIDStoreApi | undefined>(
  undefined,
)

export type RoomIDStoreProviderProps = {
  children: ReactNode
  initState: RoomIDStoreState
}

export const RoomIDStoreProvider = ({
  initState,
  children,
}: RoomIDStoreProviderProps) => {
  const storeRef = useRef<RoomIDStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createRoomIDStore(initState)
  }

  return (
    <RoomIDStoreContext.Provider value={storeRef.current}>
      {children}
    </RoomIDStoreContext.Provider>
  )
}

export const useRoomIDStore = <T,>(selector: (store: RoomIDStore) => T): T => {
  const roomIDStoreContext = useContext(RoomIDStoreContext)

  if (!roomIDStoreContext) {
    throw new Error(`useRoomIDStore must be used within RoomIDStoreProvider`)
  }

  return useStore(roomIDStoreContext, selector)
}
