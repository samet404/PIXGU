import type { Peers } from '@/types'
import { sendToPeer } from '@/utils/sendToPeer'

export const sendEveryonePlayerLeaved = async (
  playerID: string,
  peers: Peers,
) => {
  for (const userID in peers) {
    if (peers[userID]?.peer) {
      sendToPeer(peers[userID].peer, {
        from: 'host',
        event: 'playerLeft',
        data: {
          ID: playerID,
        },
      })
    }
  }
}
