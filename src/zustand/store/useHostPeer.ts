import type SimplePeer from 'simple-peer'
import { create } from 'zustand'

type State = {
  peer: SimplePeer.Instance | null
  status: 'connecting' | 'connected' | 'failed'
}

type Action = {
  set: (input: Partial<State>) => void
  get: () => SimplePeer.Instance | null
  reset: () => void
}

const initValue = {
  peer: null,
  status: 'connecting',
} as const

export const useHostPeer = create<State & Action>((set, get) => ({
  ...initValue,

  set: (input) => {
    set({
      ...get(),
      ...input,
    })
  },
  get: () => get().peer,
  reset: () => set({ ...initValue }),
}))
