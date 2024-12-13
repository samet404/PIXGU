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
        peer?.send(JSON.stringify(d))
        grayLog(JSON.stringify({
          name: 'DATA_SENT_TO_PEER',
          data,
          sendingAt: Date.now(),
        }, null, 2))
      } catch (e) {
        negativeLog('Error sending data to peer:', e)
      }
    })

    return
  }

  if (isObject(data)) {
    try {
      peer?.send(JSON.stringify(data))
      grayLog(JSON.stringify({
        name: 'SENDING_DATA_TO_PEER',
        data,
        sendingAt: Date.now(),
      }, null, 2))
    } catch (e) {
      negativeLog('Error sending data to peer:', e)
    }

    return
  }
}
