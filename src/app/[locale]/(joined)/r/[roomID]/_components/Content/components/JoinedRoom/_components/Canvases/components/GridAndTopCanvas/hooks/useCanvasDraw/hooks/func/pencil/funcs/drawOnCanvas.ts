import type { RGBAObj } from '@/types'
import { calculatePixelsBetween } from '@/utils/calculatePixelsBetween'
import { fillOnePixel } from '@/utils/room'
import { sendToHostPeer } from '@/utils/sendToHostPeer'
import { usePixelHistory, usePixelsOnDraw } from '@/zustand/store'
import { addToHistory } from './addToHistory'

export const drawOnCanvas = (
  newX: number,
  newY: number,
  rgba: RGBAObj,
  myUserID: string,
) => {
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

  const lastPixelOnDraw =
    usePixelsOnDraw.getState().value[
    usePixelsOnDraw.getState().value.length - 1
    ]

  addToHistory(newX, newY)


  if (lastPixelOnDraw) {
    const prevX = lastPixelOnDraw[0]
    const prevY = lastPixelOnDraw[1]

    console.log(newX, newY, prevX, prevY)
    console.log(usePixelsOnDraw.getState().value)
    const pixelsBetween = calculatePixelsBetween(prevX, prevY, newX, newY)

    console.log('pixels between ', pixelsBetween.length)
    console.log('pixelsBetween: ', pixelsBetween, newX, newY)

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

      addToHistory(newX, newY)
    }
  }

  usePixelsOnDraw.getState().set({
    x: newX,
    y: newY,
  })
}
