import type { WebRTCConnData } from '@/types'
import { usePeers } from '@/zustand/store'

export const sendToPeerWithID = (peerID: string, data: WebRTCConnData) => {
  const peer = usePeers.getState().get()[peerID]?.peer
  if (!peer) {
    import('@/utils/negativeLog').then(({ negativeLog }) =>
      negativeLog('Peer not found when sending data with ID', peerID),
    )

    return
  }

  import('./sendToPeer').then(({ sendToPeer }) => sendToPeer(peer, data))
}
