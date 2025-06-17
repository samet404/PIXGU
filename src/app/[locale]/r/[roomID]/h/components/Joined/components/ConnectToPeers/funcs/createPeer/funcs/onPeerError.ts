import type PixguPeer from '@/pixgu-peer/types'
import { negativeLog } from '@/utils/negativeLog'
import { useSocketIO } from '@/zustand/store/useSocketIO'

export const onPeerError = (peer: PixguPeer.Instance, userID: string) =>
  peer.on('error', (err) => {
    useSocketIO.getState().io!.emit('connection-failed', userID)
    negativeLog(`ERROR IN PEER CONNECTION TO ${userID}`, err)
  })
