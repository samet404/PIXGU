import type SimplePeer from 'simple-peer'
import { create } from 'zustand'

export type HostPeerState = {
  peer: SimplePeer.Instance | null
  status:
    | 'connecting'
    | 'connected'
    | 'failed'
    | 'disconnected'
    | 'host not found'
}

type Action = {
  set: (input: Partial<HostPeerState>) => void
  get: () => SimplePeer.Instance | null
  reset: () => void
}

const initValue = {
  peer: null,
  status: 'host not found',
} as const

export const useHostPeer = create<HostPeerState & Action>((set, get) => ({
  ...initValue,

  set: (input) => {
    set({
      ...get(),
      ...input,
    })
  },
  get: () => get().peer,
  reset: () => {
    const peer = get().peer
    if (peer) peer.destroy()
    set(initValue)
  },
}))
