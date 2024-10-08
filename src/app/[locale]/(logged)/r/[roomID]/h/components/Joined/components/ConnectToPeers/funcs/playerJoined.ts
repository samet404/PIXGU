import { positiveLog } from '@/utils'
import { useSocketIO } from '@/zustand/store'
import type { User } from 'lucia'
import { createPeer } from './createPeer'

export const playerJoined = (roomID: string) => {
  useSocketIO.getState().io!.on('player-joined', (player: User) => {
    const userID = player.id
    positiveLog(`USER ${userID} ENTERED >`)
    positiveLog(`INITIATING PEER CONNECTION TO ${userID}`)
    createPeer(roomID, player)
  })
}
