import type { RGBAObj } from '@/types'
import { fillOnePixel } from '@/utils/room'
import { useCanvasesMainData, usePixelHistory } from '@/zustand/store'

export const drawOnCanvas = (
  rgba: RGBAObj,
  cordinates: { x: number; y: number },
) => {
  const { x, y } = cordinates
  const { r, g, b, a } = rgba
  const { draft, main } = useCanvasesMainData.getState().get()

  usePixelHistory.getState().add({ x, y, r, g, b, a })

  const mctx = main!.getContext('2d')!
  const dctx = draft!.getContext('2d')!

  fillOnePixel(x, y, rgba)
  mctx.drawImage(draft!, 0, 0) // copy drawing to main
  dctx.clearRect(0, 0, draft!.width, draft!.height) // clear draft
}
