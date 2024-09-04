import type { PrevPainterDraw } from '@/types/webRTCConnData'
import { fillOnePixel } from '@/utils/room/fillOnePixel'

export const getPrevPainterDraw = (data: PrevPainterDraw['data']) =>
  data.pixels.forEach(({ x, y, rgba }) => fillOnePixel(x, y, rgba))
