import type { WebRTCConnData } from '@/types/webRTCConnData'
import type SimplePeer from 'simple-peer'
import { negativeLog } from './negativeLog'
import { grayLog } from './grayLog'

/**
 * Send data to peer
 */
export const sendToPeer = (
  peer: SimplePeer.Instance,
  data: WebRTCConnData | WebRTCConnData[],
) => {
  if (typeof data === 'object') {
    grayLog(`SENDING ${(data as WebRTCConnData).event} TO PEER`, data, peer)
  } else if (Array.isArray(data)) {
    // eslint-disable-next-line no-extra-semi
    ;(data as WebRTCConnData[]).forEach((d) => {
      grayLog(`SENDING ${d.event} TO PEER`, data, peer)
    })
  }

  if (!peer) {
    negativeLog('Peer not found when sending data')
    return
  }

  try {
    if (typeof data === 'object') peer.send(JSON.stringify(data))
    else if (Array.isArray(data))
      (data as WebRTCConnData[]).forEach((d) => peer.send(JSON.stringify(d)))
  } catch (e) {
    negativeLog('Error sending data to peer:', e)
  }
}
