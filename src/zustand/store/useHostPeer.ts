import type SimplePeer from 'simple-peer'
import { create } from 'zustand'

type State = {
  peer: SimplePeer.Instance | null
  status: 'connecting' | 'connected' | 'failed'
}

type Action = {
  set: (input: Partial<State>) => void

  get: () => SimplePeer.Instance | null
}

export const useHostPeer = create<State & Action>((set, get) => ({
  peer: null,
  status: 'connecting',

  set: (input) => {
    set({
      ...get(),
      ...input,
    })
  },
  get: () => get().peer,
}))
