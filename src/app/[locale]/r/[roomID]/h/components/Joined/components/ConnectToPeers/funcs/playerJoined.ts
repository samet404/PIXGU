import { positiveLog } from '@/utils'
import { useSocketIO } from '@/zustand/store'
import type { User } from 'lucia'
import { createPeer } from './createPeer'
import type { Guest } from '@/types'

export const playerJoined = (roomID: string) => {
  useSocketIO.getState().io!.on('player-joined', (player: User | Guest) => {
    console.log('player: ', player)
    const userID = 'id' in player ? player.id : player.ID

    positiveLog(`USER ${userID} ENTERED >`)
    positiveLog(`INITIATING PEER CONNECTION TO ${userID}`)
    createPeer(roomID, player)
  })
}
