import type { Peers } from '@/types'
import type SimplePeer from 'simple-peer'
import { create } from 'zustand'

type State = {
  peers: Peers
  secretKeys: Record<string, string>
}

type Action = {
  add: (input: { ID: string; peer: SimplePeer.Instance }) => void
  addSecretKey: (ID: string, key: string) => void
  removePeer: (ID: string) => void
  get: () => Peers
  reset: () => void
}

const initState: State = {
  peers: {},
  secretKeys: {},
}

export const usePeers = create<State & Action>((set, get) => ({
  ...initState,

  get: () => get().peers,
  removePeer: (ID) => {
    const peer = get().peers[ID]?.peer
    if (peer) {
      peer.destroy()
      delete get().peers[ID]
    }
  },

  addSecretKey: (ID, key) => {
    set({
      ...get(),
      secretKeys: {
        ...get().secretKeys,
        [ID]: key,
      },
    })
  },

  add: (input) => {
    const { ID, peer } = input

    set({
      peers: {
        ...get().peers,
        [ID]: { peer },
      },
    })
  },
  reset: () => {
    for (const ID in get().peers) {
      get().removePeer(ID)
    }
    set({ peers: {} })
  },
}))
