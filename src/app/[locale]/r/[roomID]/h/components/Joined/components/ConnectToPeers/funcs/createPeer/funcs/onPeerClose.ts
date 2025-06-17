import { negativeLog } from '@/utils'
import { useSocketIO } from '@/zustand/store/useSocketIO'
import { playerLeft } from '../../playerLeft'
import type { Locale } from '@/types/locale'
import type PixguPeer from '@/pixgu-peer/types'
// import { playerLeaved } from './funcs/playerLeaved'

export const onPeerClose = (
  peer: PixguPeer.Instance,
  userID: string,
  roomID: string,
  locale: Locale,
) =>
  peer.on('close', () => {
    negativeLog('PEER CLOSED', userID)
    useSocketIO.getState().io!.emit('connection-failed', userID)

    playerLeft(userID, roomID, locale)
  })
