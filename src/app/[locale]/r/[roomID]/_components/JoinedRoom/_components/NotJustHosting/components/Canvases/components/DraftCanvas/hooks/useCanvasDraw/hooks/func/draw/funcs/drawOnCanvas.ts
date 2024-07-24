import { fillOnePixel } from '@/utils/room'
import type {
  CanvasesMainData,
  HostPeer,
  IntRange,
  PainterData,
  RGBAObj,
  WebRTCConnData,
} from '@/types'

export const drawOnCanvas = (
  myUserID: string,
  painterData: PainterData,
  canvasesMainData: CanvasesMainData,
  newX: number,
  newY: number,
  rgba: RGBAObj,
  hostPeer: HostPeer,
) => {
  const prevA = painterData.value.pixelHistory[`${newX}_${newY}`]?.a ?? 0

  const { r, g, b, a } = rgba
  painterData.value.pixelHistory[`${newX}_${newY}`] = {
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

  const connData: WebRTCConnData = {
    userID: myUserID,
    event: 'draw',
    x: newX,
    y: newY,
    rgba: { r, g, b, a },
  }

  hostPeer.peer.send(JSON.stringify(connData))

  painterData.value.lastDrawedPixel = {
    x: newX,
    y: newY,
  }
}
