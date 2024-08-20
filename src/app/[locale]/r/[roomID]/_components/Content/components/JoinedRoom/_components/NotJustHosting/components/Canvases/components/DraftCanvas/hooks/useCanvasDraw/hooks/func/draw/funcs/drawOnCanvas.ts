import { fillOnePixel } from '@/utils/room'
import type { IntRange, RGBAObj } from '@/types'
import { sendToHostPeer } from '@/utils/sendToHostPeer'
import { usePainterData } from '@/zustand/store'

export const drawOnCanvas = (
  newX: number,
  newY: number,
  rgba: RGBAObj,
  myUserID: string,
) => {
  const painterData = usePainterData.getState().get()
  const setPainterData = usePainterData.getState().add

  if (!painterData.amIPainter) return null
  const prevA =
    painterData.painters[myUserID]!.pixelHistory[`${newX}_${newY}`]?.a ?? 0

  const { r, g, b, a } = rgba

  setPainterData({
    ...painterData,
    painters: {
      ...painterData.painters,

      [myUserID]: {
        pixelHistory: {
          ...painterData.painters[myUserID]!.pixelHistory,
          [`${newX}_${newY}`]: {
            r: r,
            g: g,
            b: b,
            a: (a + prevA) as IntRange<0, 2>,
          },
        },

        lastDrawedPixel: {
          x: newX,
          y: newY,
        },
      },
    },
  })

  fillOnePixel(newX, newY, rgba)

  sendToHostPeer({
    from: 'client',
    event: 'painterDraw',
    data: {
      painterID: myUserID,
      x: newX,
      y: newY,
      rgba,
    },
  })
}
