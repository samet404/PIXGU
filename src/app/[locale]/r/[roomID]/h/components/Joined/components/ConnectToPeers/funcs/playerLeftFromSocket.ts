import { negativeLog } from '@/utils'
import { useSocketIO } from '@/zustand/store'
import { playerLeft } from './playerLeft'
import type { Guest } from '@/types/guest'
import type { User } from 'lucia'

export const playerLeftFromSocket = (roomID: string) =>
  useSocketIO
    .getState()
    .io!.on('player-left', (user: Guest | User) => {
      const ID = 'ID' in user ? user.ID : user.id
      negativeLog(`USER ${ID} LEFT FROM SOCKET`)

      playerLeft(ID, roomID)
    })
