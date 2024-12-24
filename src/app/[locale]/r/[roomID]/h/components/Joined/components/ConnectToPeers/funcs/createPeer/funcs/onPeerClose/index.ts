import { negativeLog } from '@/utils'
import { useSocketIO } from '@/zustand/store'
import type SimplePeer from 'simple-peer'
import { playerLeft } from '../../../playerLeft'
// import { playerLeaved } from './funcs/playerLeaved'

export const onPeerClose = (
  peer: SimplePeer.Instance,
  userID: string,
  roomID: string,
) =>
  peer.on('close', () => {
    negativeLog('PEER CLOSED', userID)
    useSocketIO.getState().io!.emit('connection-failed', userID)

    playerLeft(userID, roomID)
  })
