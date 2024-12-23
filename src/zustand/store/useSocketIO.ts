import { create } from 'zustand'
import type { Socket } from 'socket.io-client'

export type SocketIOStoreState = {
  io: Socket | null
}

export type SocketIOStoreAction = {
  setIO: (io: Socket | null) => void
}

export type SocketIOStore = SocketIOStoreState & SocketIOStoreAction

export const useSocketIO = create<SocketIOStore>((set, get) => ({
  io: null,
  setIO: (io) => set({ io })
}))
9