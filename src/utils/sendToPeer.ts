import type { WebRTCConnData } from '@/types/webRTCConnData'
import type SimplePeer from 'simple-peer'

/**
 * Send data to peer
 */
export const sendToPeer = async (
  peer: SimplePeer.Instance | undefined,
  data: WebRTCConnData | WebRTCConnData[],
) => {
  if (!peer) {
    const { negativeLog } = await import('./_index')

    if (typeof data === 'object') {
      negativeLog(
        `PEER OBJECT NOT FOUND WHEN SENDING ${(data as WebRTCConnData).event} TO PEER`,
        data,
      )
      return
    }

    if (Array.isArray(data))
      (data as WebRTCConnData[]).forEach((d) => {
        negativeLog(
          `PEER OBJECT NOT FOUND WHEN SENDING ${(data as WebRTCConnData).event} TO PEER`,
          data,
        )
      })
    return
  }

  const { grayLog } = await import('./_index')

  if (typeof data === 'object') {
    grayLog(`SENDING ${(data as WebRTCConnData).event} TO PEER`, data, peer)
  } else if (Array.isArray(data)) {
    // eslint-disable-next-line no-extra-semi
    ;(data as WebRTCConnData[]).forEach((d) => {
      grayLog(`SENDING ${d.event} TO PEER`, data, peer)
    })
  }

  try {
    if (typeof data === 'object') peer.send(JSON.stringify(data))
    else if (Array.isArray(data))
      (data as WebRTCConnData[]).forEach((d) => peer.send(JSON.stringify(d)))
  } catch (e) {
    const { negativeLog } = await import('./_index')
    negativeLog('Error sending data to peer:', e)
  }
}
