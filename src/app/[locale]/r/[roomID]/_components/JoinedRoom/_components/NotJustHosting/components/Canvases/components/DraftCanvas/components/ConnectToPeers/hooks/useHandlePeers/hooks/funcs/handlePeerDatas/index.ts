import type {
  CanvasesMainData,
  HostPeer,
  PainterData,
  WebRTCConnData,
} from '@/types'
import { decodedOnPeerData } from '@/utils'
import { getPainterDraw } from './funcs'
import { getPlayersIDs } from './funcs/getPlayersIDs'

/**
 * This function handles different peer datas.
 */
export const handlePeerDatas = (
  hostPeer: HostPeer,
  canvasesMainData: CanvasesMainData,
  painterData: PainterData,
  updatePlayersIDsState: (newIDs: string[]) => void,
) => {
  decodedOnPeerData(hostPeer.peer, (strData) => {
    const data: WebRTCConnData = JSON.parse(strData)

    getPainterDraw(data, canvasesMainData, painterData)
    getPlayersIDs(data, updatePlayersIDsState)
  })
}
