import { drawOnCanvas } from './func'
import type { WebRTCConnData } from '@/types'

export const getPainterDraw = (rtcData: WebRTCConnData) => {
  if (rtcData.event !== 'painterDraw' || rtcData.from !== 'host') return null
  const { x, y, rgba } = rtcData.data
  drawOnCanvas(rgba, { x, y })
}
