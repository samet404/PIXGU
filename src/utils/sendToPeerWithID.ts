import type { WebRTCConnData } from '@/types'
import { usePeers } from '@/zustand/store'
import { negativeLog, sendToPeer } from './_index'

export const sendToPeerWithID = (userID: string, data: WebRTCConnData) => {
  const peer = usePeers.getState().get()[userID]?.peer
  if (!peer) {
    negativeLog('Peer not found when sending data with ID', userID)
    return
  }
  const secretKey = usePeers.getState().secretKeys[userID]!
  sendToPeer(peer, secretKey, data)
}
