import type { CanvasDataRef, PeersRef, WebRTCConnData } from '@/types'
import type SimplePeer from 'simple-peer'
import { decodedOnPeerData } from '@/utils'
import { getPainterDraw } from './funcs'

/**
 * This function handles different peer datas.
 *
 * @param peer - The peer object
 */
export const handlePeerDatas = (
  peer: SimplePeer.Instance,
  canvasDataRef: CanvasDataRef,
  peersRef: PeersRef,
) => {
  decodedOnPeerData(peer, (strData) => {
    const data: WebRTCConnData = JSON.parse(strData)

    getPainterDraw(
      data,
      draft,
      main,
      painter.pixelHistory,
      cellPixelLength,
      peersRef,
    )
  })
}
