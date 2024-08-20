import type { WebRTCConnData } from '@/types'
import { goldLog } from '@/utils/goldLog'
import { usePainterData } from '@/zustand/store'

export const getPainters = (rtcData: WebRTCConnData, myUserID: string) => {
  const { event, from, data } = rtcData

  if (event === 'currentPainters' && from === 'host') {
    const amIPainter = data.includes(myUserID)

    goldLog(`Am i painter: ${amIPainter}`)

    usePainterData.getState().add({
      amIPainter,

      painters: {
        [data[0]]: {
          lastDrawedPixel: null,
          pixelHistory: {},
        },

        [data[1]]: {
          lastDrawedPixel: null,
          pixelHistory: {},
        },
      },
    })
  }
}
