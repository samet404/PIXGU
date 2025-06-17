import type { WebRTCConnData } from '@/types/webRTCConnData'
import type PixguPeer from '@/pixgu-peer/types'
import { isObject } from './isObject'
import { grayLog } from './grayLog'
import { negativeLog } from './negativeLog'
import { AES } from 'crypto-js'

/**
 * Send data to peer
 */
export const sendToPeer = (
  peer: PixguPeer.Instance | undefined,
  secretKey: string,
  data: WebRTCConnData | WebRTCConnData[],
) => {
  if (Array.isArray(data)) {
    data.forEach((d) => {
      const encryptedData = AES.encrypt(JSON.stringify(d), secretKey).toString()

      try {
        peer?.send(encryptedData)
        grayLog(
          JSON.stringify(
            {
              name: 'DATA_SENT_TO_PEER',
              data,
              sendingAt: Date.now(),
            },
            null,
            2,
          ),
        )
      } catch (e) {
        negativeLog('Error sending data to peer:', e)
      }
    })

    return
  }

  if (isObject(data)) {
    try {
      const encryptedData = AES.encrypt(
        JSON.stringify(data),
        secretKey,
      ).toString()

      peer?.send(encryptedData)
      grayLog(
        JSON.stringify(
          {
            name: 'SENDING_DATA_TO_PEER',
            data,
            sendingAt: Date.now(),
          },
          null,
          2,
        ),
      )
    } catch (e) {
      negativeLog('Error sending data to peer:', e)
    }

    return
  }
}
