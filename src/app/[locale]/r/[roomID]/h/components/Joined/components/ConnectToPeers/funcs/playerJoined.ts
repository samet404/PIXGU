import { positiveLog } from '@/utils'
import { usePeers, useSocketIO } from '@/zustand/store'
import type { User } from 'lucia'
import { createPeer } from './createPeer'
import type { Guest } from '@/types'

export const playerJoined = (roomID: string) => {
  useSocketIO.getState().io!.on('player-joined', (player: User | Guest) => {
    console.log('player: ', player)
    const userID = 'id' in player ? player.id : player.ID

    if (usePeers.getState().isExits(userID)) {
      useSocketIO.getState().io!.emit('connection-failed', userID)
      return
    }

    positiveLog(`USER ${userID} ENTERED >`)
    positiveLog(`INITIATING PEER CONNECTION TO ${userID}`)
    createPeer(roomID, player)
  })
}
