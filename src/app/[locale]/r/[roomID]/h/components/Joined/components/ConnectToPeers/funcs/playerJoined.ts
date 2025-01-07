import { positiveLog } from '@/utils'
import { usePeers, usePlayers, useSocketIO } from '@/zustand/store'
import type { User } from 'lucia'
import { createPeer } from './createPeer'
import type { Guest, Locale } from '@/types'
import type { Socket } from 'socket.io-client'

export const playerJoined = (io: Socket, roomID: string, locale: Locale) => {
  io.on('player-joined', ({ clientInfo, uniqueSocketID }: {
    clientInfo: User | Guest
    uniqueSocketID: string
  }) => {
    console.log('clientInfo: ', clientInfo)
    const userID = 'id' in clientInfo ? clientInfo.id : clientInfo.ID

    if (usePeers.getState().peers[userID] || usePlayers.getState().value.count === 10) {
      useSocketIO.getState().io!.emit('connection-failed', userID)
      return
    }

    positiveLog(`USER ${userID} ENTERED >`)
    positiveLog(`INITIATING PEER CONNECTION TO ${userID}`)
    createPeer(roomID, uniqueSocketID, clientInfo, locale)
  })
}
