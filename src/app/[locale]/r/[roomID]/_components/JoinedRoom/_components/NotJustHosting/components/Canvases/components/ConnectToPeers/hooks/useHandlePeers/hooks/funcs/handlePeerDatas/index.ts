import type {
  CanvasesMainData,
  HostPeer,
  PainterData,
  RoomPlayersDbInfo,
  RoomPlayersDbInfoOrderedByJoinTime,
} from '@/types'
import { decodedOnPeerData, grayLog } from '@/utils'
import {
  getChats,
  getJoinedPlayers,
  getPainterDraw,
  getLeftPlayers,
} from './funcs'

/**
 * This function handles different peer datas.
 */
export const handlePeerDatas = (
  hostPeer: HostPeer,
  canvasesMainData: CanvasesMainData,
  painterData: PainterData,
) => {
  decodedOnPeerData(hostPeer.peer!, (data) => {
    if (data.from !== 'host') return null
    grayLog(`RECEIVED ${data.event} DATA FROM HOST`, data)

    getPainterDraw(data, canvasesMainData, painterData)
    getLeftPlayers(data)
    getJoinedPlayers(data)
    getChats(data)
  })
}
