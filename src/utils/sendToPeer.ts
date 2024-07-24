import type { WebRTCConnData } from '@/types/webRTCConnData'
import type SimplePeer from 'simple-peer'

/**
 * Send data to peer
 */
export const sendToPeer = (
  peer: SimplePeer.Instance,
  data: WebRTCConnData | WebRTCConnData[],
) => {
  if (typeof data === 'object') peer.send(JSON.stringify(data))
  else if (Array.isArray(data))
    (data as WebRTCConnData[]).forEach((d) => peer.send(JSON.stringify(d)))
}
