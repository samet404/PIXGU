import type {
  CanvasesMainData,
  CanvasesPainterData,
  Peers,
  WebRTCConnData,
} from '@/types'
import type SimplePeer from 'simple-peer'
import { decodedOnPeerData } from '@/utils'
import { getPainterDraw } from './funcs'

/**
 * This function handles different peer datas.
 */
export const handlePeerDatas = (
  peer: SimplePeer.Instance,
  peers: Peers,
  canvasesMainData: CanvasesMainData,
  canvasesPainterData: CanvasesPainterData,
) => {
  decodedOnPeerData(peer, (strData) => {
    const data: WebRTCConnData = JSON.parse(strData)

    getPainterDraw(data, peers, canvasesMainData, canvasesPainterData)
  })
}
