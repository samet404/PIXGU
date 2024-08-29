import type { WebRTCConnData } from '@/types/webRTCConnData'
import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { useWhoIsPainter } from '@/zustand/store'

export const painterDraw = (rtcData: WebRTCConnData, userID: string) => {
  if (
    rtcData.event !== 'painterDraw' ||
    rtcData.from !== 'client' ||
    !useWhoIsPainter.getState().isPainter(userID)
  )
    return

  const { x, y, rgba } = rtcData.data

  sendToAllPeers(
    {
      from: 'host',
      event: 'painterDraw',
      data: {
        painterID: userID,
        x,
        y,
        rgba,
      },
    },
    {
      except: [userID],
    },
  )
}
