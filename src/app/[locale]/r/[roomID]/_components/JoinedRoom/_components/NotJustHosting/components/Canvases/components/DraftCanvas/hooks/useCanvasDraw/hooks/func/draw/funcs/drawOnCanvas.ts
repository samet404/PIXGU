import { fillOnePixel } from '@/utils/room'
import type {
  CanvasesMainData,
  HostPeer,
  IntRange,
  PainterData,
  RGBAObj,
} from '@/types'
import { sendToPeer } from '@/utils'

export const drawOnCanvas = (
  myUserID: string,
  painterData: PainterData,
  canvasesMainData: CanvasesMainData,
  newX: number,
  newY: number,
  rgba: RGBAObj,
  hostPeer: HostPeer,
) => {
  if (!painterData.value?.amIPainter || !painterData.value.painters[myUserID])
    return null
  const prevA =
    painterData.value.painters[myUserID].pixelHistory[`${newX}_${newY}`]?.a ?? 0

  const { r, g, b, a } = rgba
  painterData.value.painters[myUserID].pixelHistory[`${newX}_${newY}`] = {
    r: r,

    g: g,
    b: b,
    a: (a + prevA) as IntRange<0, 2>,
  }

  fillOnePixel(
    canvasesMainData.cellPixelLength!,
    canvasesMainData.draft!,
    newX,
    newY,
    rgba,
  )

  sendToPeer(hostPeer.peer!, {
    from: 'client',
    event: 'painterDraw',
    data: {
      painterID: myUserID,
      x: newX,
      y: newY,
      rgba,
    },
  })

  painterData.value.painters[myUserID].lastDrawedPixel = {
    x: newX,
    y: newY,
  }
}
