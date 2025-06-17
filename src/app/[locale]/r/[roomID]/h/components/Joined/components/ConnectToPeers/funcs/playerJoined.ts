import { positiveLog } from '@/utils'
import { usePeers } from '@/zustand/store/usePeers'
import { usePlayers } from '@/zustand/store/usePlayers'
import { useSocketIO } from '@/zustand/store/useSocketIO'
import { createPeer } from './createPeer'
import type { Guest, Locale } from '@/types'
import type { Socket } from 'socket.io-client'

export const playerJoined = (io: Socket, roomID: string, locale: Locale) => {
  io.on('player-joined', ({ clientInfo, uniqueSocketID }: {
    clientInfo: Guest
    uniqueSocketID: string
  }) => {
    console.log('clientInfo: ', clientInfo)
    const userID = clientInfo.ID

    if (usePeers.getState().peers[userID] || usePlayers.getState().value.count === 10) {
      useSocketIO.getState().io!.emit('connection-failed', userID)
      return
    }

    positiveLog(`USER ${userID} ENTERED >`)
    positiveLog(`INITIATING PEER CONNECTION TO ${userID}`)
    createPeer(roomID, uniqueSocketID, clientInfo, locale)
  })
}
