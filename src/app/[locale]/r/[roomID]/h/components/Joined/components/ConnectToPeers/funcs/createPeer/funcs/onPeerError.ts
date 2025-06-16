import { negativeLog } from '@/utils/negativeLog'
import { useSocketIO } from '@/zustand/store/useSocketIO'
import type PixguPeer from 'simple-peer'

export const onPeerError = (peer: PixguPeer.Instance, userID: string) =>
  peer.on('error', (err) => {
    useSocketIO.getState().io!.emit('connection-failed', userID)
    negativeLog(`ERROR IN PEER CONNECTION TO ${userID}`, err)
  })
