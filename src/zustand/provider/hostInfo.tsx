'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import {
  type HostInfoStore,
  type HostInfoStoreState,
  createHostInfoStore,
} from '@/zustand/store/useHostInfo'

export type HostInfoStoreApi = ReturnType<typeof createHostInfoStore>

export const HostInfoStoreContext = createContext<HostInfoStoreApi | undefined>(
  undefined,
)

export type HostInfoStoreProviderProps = {
  children: ReactNode
  initState: HostInfoStoreState
}

export const HostInfoStoreProvider = ({
  initState,
  children,
}: HostInfoStoreProviderProps) => {
  const storeRef = useRef<HostInfoStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createHostInfoStore(initState)
  }

  return (
    <HostInfoStoreContext.Provider value={storeRef.current}>
      {children}
    </HostInfoStoreContext.Provider>
  )
}

export const useHostInfoStore = <T,>(
  selector: (store: HostInfoStore) => T,
): T => {
  const roomIDStoreContext = useContext(HostInfoStoreContext)

  if (!roomIDStoreContext) {
    throw new Error(
      `useHostInfoStore must be used within HostInfoStoreProvider`,
    )
  }

  return useStore(roomIDStoreContext, selector)
}
