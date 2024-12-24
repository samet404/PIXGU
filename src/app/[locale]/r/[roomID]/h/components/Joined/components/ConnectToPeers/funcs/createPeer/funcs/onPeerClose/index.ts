import { negativeLog } from '@/utils'
import { usePeers, useSocketIO } from '@/zustand/store'
import type SimplePeer from 'simple-peer'
import { playerLeft } from '../../../playerLeft'
// import { playerLeaved } from './funcs/playerLeaved'

export const onPeerClose = (
  peer: SimplePeer.Instance,
  userID: string,
  uniqueSocketID: string,
  roomID: string,
) =>
  peer.on('close', () => {
    negativeLog('PEER CLOSED', userID)
    useSocketIO.getState().io!.emit('connection-failed', userID)

    if (!usePeers.getState().isExits(userID, uniqueSocketID)) return

    playerLeft(userID, roomID)
  })
