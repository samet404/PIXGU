import { negativeLog } from '@/utils'
import { playerLeft } from './playerLeft'
import type { Locale } from '@/types/locale'
import type { Socket } from 'socket.io-client'

export const playerLeftFromSocket = (io: Socket, roomID: string, locale: Locale) =>
  io.on('player-left', ({ clientID }: {
    clientID: string
    uniqueSocketID: string
  }) => {
    negativeLog(`USER ${clientID} LEFT FROM SOCKET`)

    playerLeft(clientID, roomID, locale)
  })
