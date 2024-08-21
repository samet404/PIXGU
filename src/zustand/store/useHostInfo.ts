import { createStore } from 'zustand'

type HostInfo = {
  amIHost: boolean
  hostID: string
  isPlayer: boolean
}

export type HostInfoStoreState = HostInfo

export type HostInfoStoreAction = {
  get: () => HostInfo
}

export type HostInfoStore = HostInfoStoreState & HostInfoStoreAction

export const createHostInfoStore = (initValue: HostInfo) =>
  createStore<HostInfoStore>((set, get) => ({
    ...initValue,

    get: () => get(),
  }))
