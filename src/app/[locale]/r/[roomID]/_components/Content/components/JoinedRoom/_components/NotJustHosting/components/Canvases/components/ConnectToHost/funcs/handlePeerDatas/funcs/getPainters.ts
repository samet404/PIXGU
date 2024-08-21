import type { WebRTCConnData } from '@/types'
import { goldLog } from '@/utils/goldLog'
import { usePainterData } from '@/zustand/store'

export const getPainters = (rtcData: WebRTCConnData, myUserID: string) => {
  const { event, from, data } = rtcData

  if (event === 'currentPainter' && from === 'host') {
    goldLog('currentPainter', data)
    usePainterData.getState().addNewPainter({
      ID: data,
      lastDrawedPixel: null,
      pixelHistory: {},
    })
  }
}
