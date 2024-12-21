import type SimplePeer from 'simple-peer'
import { create } from 'zustand'

export type HostPeerState = {
  peer: SimplePeer.Instance | null
  status:
  | 'connecting'
  | 'connected'
  | 'failed'
  | 'disconnected'
  | 'finding host'
  secretKey: string | null
}

type Action = {
  set: (input: Partial<HostPeerState>) => void
  get: () => SimplePeer.Instance | null
  reset: () => void
}

const initValue: HostPeerState = {
  peer: null,
  status: 'finding host',
  secretKey: null
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
    if (peer) {
      console.log('peer destroyed')
      peer.destroy()
    }

    set({ ...initValue })
  },
}))
