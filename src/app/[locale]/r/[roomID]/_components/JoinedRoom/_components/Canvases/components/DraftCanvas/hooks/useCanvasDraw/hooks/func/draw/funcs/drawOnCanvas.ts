import { fillOnePixel } from '@/utils/room'
import type {
  CanvasData,
  IntRange,
  Peers,
  RGBAObj,
  WebRTCConnData,
} from '@/types'

export const drawOnCanvas = (
  myUserID: string,
  canvasData: CanvasData,
  newX: number,
  newY: number,
  rgba: RGBAObj,
  peers: Peers,
) => {
  const prevA = canvasData.painter.pixelHistory[`${newX}_${newY}`]?.a ?? 0

  const { r, g, b, a } = rgba
  canvasData.painter.pixelHistory[`${newX}_${newY}`] = {
    r: r,

    g: g,
    b: b,
    a: (a + prevA) as IntRange<0, 2>,
  }

  fillOnePixel(canvasData.cellPixelLength, canvasData.draft!, newX, newY, rgba)

  for (const userID in peers) {
    const peer = peers[userID]?.peer
    if (!peer) return null
    const themSecretKey = peers[userID]?.themSecretKey
    if (!themSecretKey) return null

    const connData: WebRTCConnData = {
      userID: myUserID,
      secretKey: themSecretKey,
      event: 'draw',
      x: newX,
      y: newY,
      rgba: { r, g, b, a },
    }

    peers[userID]?.peer.send(JSON.stringify(connData))
  }

  canvasData.painter.lastDrawedPixel = {
    x: newX,
    y: newY,
  }
}
