import type { IntRange, RGBAObj } from '@/types'
import { fillOnePixel } from '@/utils/room'
import { sendToHostPeer } from '@/utils/sendToHostPeer'
import { useLastPixel, usePixelHistory } from '@/zustand/store'

export const drawOnCanvas = (
  newX: number,
  newY: number,
  rgba: RGBAObj,
  myUserID: string,
) => {
  const prevA = usePixelHistory.getState().get({ x: newX, y: newY })?.a ?? 0

  const { r, g, b, a } = rgba

  usePixelHistory.getState().add({
    x: newX,
    y: newY,
    r: r,
    g: g,
    b: b,
    a: (a + prevA) as IntRange<0, 2>,
  })

  useLastPixel.getState().set({
    x: newX,
    y: newY,
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
