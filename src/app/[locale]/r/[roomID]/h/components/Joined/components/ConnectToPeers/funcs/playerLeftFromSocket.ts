import { negativeLog } from '@/utils'
import { usePeers, useSocketIO } from '@/zustand/store'
import { playerLeft } from './playerLeft'

export const playerLeftFromSocket = (roomID: string) =>
  useSocketIO
    .getState()
    .io!.on('player-left', ({ clientID, uniqueSocketID }: {
      clientID: string
      uniqueSocketID: string
    }) => {
      negativeLog(`USER ${clientID} LEFT FROM SOCKET`)

      if (!usePeers.getState().isExits(clientID, uniqueSocketID)) return
      playerLeft(clientID, roomID)
    })
