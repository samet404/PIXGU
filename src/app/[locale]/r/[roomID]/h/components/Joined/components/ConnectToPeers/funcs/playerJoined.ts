import { positiveLog } from '@/utils'
import { usePeers, useSocketIO } from '@/zustand/store'
import type { User } from 'lucia'
import { createPeer } from './createPeer'
import type { Guest } from '@/types'

export const playerJoined = (roomID: string) => {
  useSocketIO.getState().io!.on('player-joined', ({ clientInfo, uniqueSocketID }: {
    clientInfo: User | Guest
    uniqueSocketID: string
  }) => {
    console.log('clientInfo: ', clientInfo)
    const userID = 'id' in clientInfo ? clientInfo.id : clientInfo.ID

    if (usePeers.getState().peers[userID]) {
      useSocketIO.getState().io!.emit('connection-failed', userID)
      return
    }

    positiveLog(`USER ${userID} ENTERED >`)
    positiveLog(`INITIATING PEER CONNECTION TO ${userID}`)
    createPeer(roomID, uniqueSocketID, clientInfo)
  })
}
