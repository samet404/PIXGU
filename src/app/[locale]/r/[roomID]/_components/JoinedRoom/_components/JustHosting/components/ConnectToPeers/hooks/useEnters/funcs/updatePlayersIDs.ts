import type { WebRTCConnData } from '@/types/webRTCConnData'
import type { Peers } from '@/types/webRTCPeers'

export const updatePlayersIDs = (
  playersIDsOrderedByTimestamp: {
    value: string[]
  },
  peers: Peers,
) => {
  playersIDsOrderedByTimestamp.value = Object.keys(peers)
  for (const peer in peers) {
    if (peers[peer]?.peer) {
      const playersIDs: WebRTCConnData = {
        type: 'directlyFromHost',
        event: 'playersIDsOrderedByTimestamp',
        data: {
          playersIDs: playersIDsOrderedByTimestamp.value,
        },
      }

      peers[peer].peer.send(JSON.stringify(playersIDs))
    }
  }
}
