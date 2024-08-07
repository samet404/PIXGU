import type { Peers, WebRTCConnData } from '@/types'
import { sendToPeer } from '@/utils/sendToPeer'

export const chat = (
  sentData: WebRTCConnData,
  peers: Peers,
  userID: string,
) => {
  const { data, event, from } = sentData

  if (from !== 'client') return null
  if (event === 'guessChat' || event === 'winnersChat') {
    for (const peerID in peers) {
      if (!peers[peerID]?.peer) continue

      sendToPeer(peers[peerID].peer, {
        from: 'host',
        event: event,
        data: {
          from: userID,
          msg: data.msg,
        },
      })
    }
  }
}
