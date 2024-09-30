import { drawOnCanvas } from './func'
import type { PainterDrawFromHostAndClient } from '@/types'

export const getPainterDraw = (data: PainterDrawFromHostAndClient['data']) => {
  const { x, y, rgba } = data
  drawOnCanvas(rgba, { x, y })
}
