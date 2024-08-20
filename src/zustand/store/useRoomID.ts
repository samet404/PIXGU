import { createStore } from 'zustand'

export type RoomIDStoreState = { roomID: string }

export type RoomIDStoreAction = {
  set: (input: string) => void
  get: () => string
}

export type RoomIDStore = RoomIDStoreState & RoomIDStoreAction

export const createRoomIDStore = (initState: RoomIDStoreState) =>
  createStore<RoomIDStore>((set, get) => ({
    ...initState,

    get: () => get().roomID,
    set: (input) => {
      set({ roomID: input })
    },
  }))
