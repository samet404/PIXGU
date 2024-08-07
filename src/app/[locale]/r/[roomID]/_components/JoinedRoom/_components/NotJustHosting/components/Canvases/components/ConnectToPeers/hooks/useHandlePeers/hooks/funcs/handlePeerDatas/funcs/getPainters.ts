import type { PainterData, WebRTCConnData } from '@/types'

export const getPainters = (
  rtcData: WebRTCConnData,
  painterData: PainterData,
) => {
  if (rtcData.event === 'currentPainters' && rtcData.from === 'host') {
    painterData.value!.painters = {}

    painterData.value!.painters[rtcData.data.painter1ID] = {
      lastDrawedPixel: null,
      pixelHistory: {},
    }

    painterData.value!.painters[rtcData.data.painter2ID] = {
      lastDrawedPixel: null,
      pixelHistory: {},
    }
  }
}
