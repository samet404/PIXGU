import type { WebRTCConnData } from '@/types'
import { usePeers } from '@/zustand/store'
import { negativeLog, sendToPeer } from './_index'

export const sendToPeerWithID = (peerID: string, data: WebRTCConnData) => {
  const peer = usePeers.getState().get()[peerID]?.peer
  if (!peer) {
    negativeLog('Peer not found when sending data with ID', peerID)
    return
  }

  sendToPeer(peer, data)
}
