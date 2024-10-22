import { useSocketIO } from '@/zustand/store'
import { createPeer } from './createPeer'
import type { User } from 'lucia'
import type { Guest } from '@/types/guest'

export const getPrevPlayers = (roomID: string) =>
  useSocketIO.getState().io!.on('prev-players', (players: (User | Guest)[]) => {
    console.log('prev-players: ', players)
    players.map((p) => createPeer(roomID, p))
  })
