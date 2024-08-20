import type { Realtime } from 'ably'
import { createStore } from 'zustand'

export type AblyClientStoreState = { value: Realtime }

// export type AblyClientStoreAction = {}

export type AblyClientStore = AblyClientStoreState
//  & AblyClientStoreAction

export const createAblyClientStore = (initState: Realtime) =>
  createStore<AblyClientStore>(() => ({
    value: initState,
  }))
