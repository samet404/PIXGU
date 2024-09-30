import type { Peers } from '@/types'
import type SimplePeer from 'simple-peer'
import { create } from 'zustand'

type State = { peers: Peers }

type Action = {
  add: (input: { ID: string; peer: SimplePeer.Instance }) => void
  removePeer: (ID: string) => void
  get: () => Peers
  reset: () => void
}

export const usePeers = create<State & Action>((set, get) => ({
  peers: {},

  get: () => get().peers,
  removePeer: (ID) => {
    const peer = get().peers[ID]?.peer
    if (peer) {
      peer.destroy()
      delete get().peers[ID]
    }
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
