import { useSocketIO } from '@/zustand/store'
import type SimplePeer from 'simple-peer'
// import { playerLeaved } from './funcs/playerLeaved'

export const onPeerClose = (
  peer: SimplePeer.Instance,
  userID: string,
  roomID: string,
) =>
  peer.on('close', () => {
    console.error('PEER CLOSED', userID)
    useSocketIO.getState().io!.emit('connection-failed', userID)
  })
