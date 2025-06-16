import { negativeLog } from '@/utils/negativeLog'
import { useSocketIO } from '@/zustand/store/useSocketIO'
import type SimplePeer from 'simple-peer'

export const onPeerError = (peer: SimplePeer.Instance, userID: string) =>
  peer.on('error', (err) => {
    useSocketIO.getState().io!.emit('connection-failed', userID)
    negativeLog(`ERROR IN PEER CONNECTION TO ${userID}`, err)
  })
