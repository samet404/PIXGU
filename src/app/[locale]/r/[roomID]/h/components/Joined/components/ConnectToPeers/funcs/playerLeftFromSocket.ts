import { negativeLog } from '@/utils'
import { useSocketIO } from '@/zustand/store'
import { playerLeft } from './playerLeft'

export const playerLeftFromSocket = (roomID: string) =>
  useSocketIO
    .getState()
    .io!.on('player-left', (ID: string) => {
      negativeLog(`USER ${ID} LEFT FROM SOCKET`)

      playerLeft(ID, roomID)
    })
