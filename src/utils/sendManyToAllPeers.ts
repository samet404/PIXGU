import { usePeers } from '@/zustand/store'
import { sendToPeer } from './sendToPeer'
import type { WebRTCConnData } from '@/types'

export const sendManyToAllPeers = (
  datas: [
    WebRTCConnData: WebRTCConnData,
    config?: {
      except?: string[]
    },
  ][],
) => {
  const peers = usePeers.getState().peers

  datas.forEach(([data, config]) => {
    for (const userID in peers) {
      if (!peers[userID]?.peer || config?.except?.includes(userID)) continue
      sendToPeer(peers[userID].peer, data)
    }
  })
}
