import type { PainterData, RGBAObj } from '@/types'
import { fillOnePixel } from '@/utils/room'
import { useCanvasesMainData, usePainterData } from '@/zustand/store'

export const drawOnCanvas = (
  painterID: string,
  rgba: RGBAObj,
  cordinates: { x: number; y: number },
) => {
  const { x, y } = cordinates
  const { r, g, b, a } = rgba
  const { draft, main, cellPixelLength } = useCanvasesMainData.getState().get()

  const painterData = usePainterData.getState().get()
  const setPainterData = usePainterData.getState().add

  setPainterData({
    painters: {
      ...painterData.painters,
      [painterID]: {
        ...painterData.painters[painterID],
        pixelHistory: {
          ...painterData.painters[painterID]?.pixelHistory,
          [`${x}_${y}`]: {
            r: r,
            g: g,
            b: b,
            a: a,
          },
        },
      },
    },
  } as PainterData)

  const mctx = main!.getContext('2d')!
  const dctx = draft!.getContext('2d')!

  fillOnePixel(x, y, rgba)
  mctx.drawImage(draft!, 0, 0) // copy drawing to main
  dctx.clearRect(0, 0, draft!.width, draft!.height) // clear draft
}
