import { useSocketIO } from '@/zustand/store'
import { createPeer } from './createPeer'
import type { User } from 'lucia'

export const getPrevPlayers = (roomID: string) =>
  useSocketIO.getState().io!.on('prev-players', (players: User[]) => {
    players.map((p) => createPeer(roomID, p))
  })
