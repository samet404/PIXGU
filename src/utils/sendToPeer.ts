import type { WebRTCConnData } from '@/types/webRTCConnData'
import type SimplePeer from 'simple-peer'
import { isObject } from './isObject'
import { grayLog } from './grayLog'
import { negativeLog } from './negativeLog'

/**
 * Send data to peer
 */
export const sendToPeer = async (
  peer: SimplePeer.Instance | undefined,
  data: WebRTCConnData | WebRTCConnData[],
) => {
  if (Array.isArray(data)) {
    data.forEach((d) => {
      try {
        grayLog(`SENDING ${d.event} TO PEER`, data, peer)
        peer?.send(JSON.stringify(d))
      } catch (e) {
        negativeLog('Error sending data to peer:', e)
      }
    })

    return
  }

  if (isObject(data)) {
    grayLog(`SENDING ${data.event} TO PEER`, data, peer)

    try {
      peer?.send(JSON.stringify(data))
    } catch (e) {
      const { negativeLog } = await import('./_index')
      negativeLog('Error sending data to peer:', e)
    }

    return
  }
}
