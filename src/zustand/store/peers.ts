import type { Peers } from '@/types'
import { filterObj } from '@/utils/filterObj'
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
    set({
      peers: filterObj(get().peers, ([k]) => k !== ID) as Peers,
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
  reset: () => set({ peers: {} }),
}))
