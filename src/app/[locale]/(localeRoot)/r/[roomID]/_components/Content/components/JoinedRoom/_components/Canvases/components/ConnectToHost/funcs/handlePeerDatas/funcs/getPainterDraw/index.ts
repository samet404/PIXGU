import type { PainterDrawFromHostAndClient } from '@/types'
import { fillOnePixel } from '@/utils/room/fillOnePixel'

export const getPainterDraw = (data: PainterDrawFromHostAndClient['data']) => {
  const { x, y, rgba } = data
  fillOnePixel(x, y, rgba)
}
