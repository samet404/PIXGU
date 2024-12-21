import { usePeers } from '@/zustand/store'
import { sendToPeer } from './sendToPeer'
import type { WebRTCConnData } from '@/types'

export const sendToAllPeers = (
  data: WebRTCConnData,
  config?: {
    except?: string[]
  },
) => {
  const peers = usePeers.getState().peers
  for (const userID in peers) {
    if (!peers[userID]?.peer || config?.except?.includes(userID)) continue
    const secretKey = usePeers.getState().secretKeys[userID]!
    sendToPeer(peers[userID].peer, secretKey, data)
  }
}
