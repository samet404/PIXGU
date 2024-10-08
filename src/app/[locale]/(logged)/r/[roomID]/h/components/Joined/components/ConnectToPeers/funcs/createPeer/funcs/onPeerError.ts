import { negativeLog } from '@/utils/negativeLog'
import type SimplePeer from 'simple-peer'

export const onPeerError = (peer: SimplePeer.Instance, userID: string) =>
  peer.on('error', (err) => {
    negativeLog(`ERROR IN PEER CONNECTION TO ${userID}`, err)
  })
