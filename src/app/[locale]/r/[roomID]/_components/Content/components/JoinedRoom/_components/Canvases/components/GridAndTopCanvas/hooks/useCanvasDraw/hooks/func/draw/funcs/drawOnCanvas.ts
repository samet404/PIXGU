import type { RGBAObj } from '@/types'
import { calculatePixelsBetween } from '@/utils/calculatePixelsBetween'
import { fillOnePixel } from '@/utils/room'
import { sendToHostPeer } from '@/utils/sendToHostPeer'
import { useLastPixel, usePixelsOnDraw } from '@/zustand/store'

export const drawOnCanvas = (
  newX: number,
  newY: number,
  rgba: RGBAObj,
  myUserID: string,
) => {
  fillOnePixel(newX, newY, rgba)

  const lastPixelOnDraw =
    usePixelsOnDraw.getState().value[
      usePixelsOnDraw.getState().value.length - 1
    ]

  if (lastPixelOnDraw) {
    const prevX = lastPixelOnDraw[0]
    const prevY = lastPixelOnDraw[1]

    console.log(newX, newY, prevX, prevY)
    console.log(usePixelsOnDraw.getState().value)
    const pixelsBetween = calculatePixelsBetween(prevX, prevY, newX, newY)

    for (let pixel of pixelsBetween) {
      sendToHostPeer({
        from: 'client',
        event: 'painterDraw',
        data: {
          painterID: myUserID,
          x: pixel.x,
          y: pixel.y,
          rgba,
        },
      })
      fillOnePixel(pixel.x, pixel.y, rgba)
    }
  }

  usePixelsOnDraw.getState().set({
    x: newX,
    y: newY,
  })

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
