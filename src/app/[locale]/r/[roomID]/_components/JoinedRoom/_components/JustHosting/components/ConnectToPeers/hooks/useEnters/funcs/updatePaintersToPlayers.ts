import type { WebRTCConnData, Peers } from '@/types'

export const updatePaintersToPlayers = (
  firstPainterID: string,
  secondPainterID: string,
  peers: Peers,
) => {
  for (const peer in peers) {
    if (peers[peer]?.peer) {
      const playersIDs: WebRTCConnData = {
        from: 'host',
        event: 'currentPainters',
        data: {
          painter1ID: firstPainterID,
          painter2ID: secondPainterID,
        },
      }

      peers[peer].peer.send(JSON.stringify(playersIDs))
    }
  }
}
