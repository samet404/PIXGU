import { negativeLog } from '@/utils'
import { useSocketIO } from '@/zustand/store'
import { playerLeft } from './playerLeft'

export const playerLeftFromSocket = (roomID: string) =>
  useSocketIO
    .getState()
    .io!.on('player-left', ({ clientID }: {
      clientID: string
      uniqueSocketID: string
    }) => {
      negativeLog(`USER ${clientID} LEFT FROM SOCKET`)

      playerLeft(clientID, roomID)
    })
