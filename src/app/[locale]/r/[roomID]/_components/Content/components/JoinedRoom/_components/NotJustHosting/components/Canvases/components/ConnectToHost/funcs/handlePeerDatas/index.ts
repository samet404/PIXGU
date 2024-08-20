import { decodedOnPeerData, grayLog } from '@/utils'
import {
  getChats,
  getJoinedPlayers,
  getPainterDraw,
  getLeftPlayers,
} from './funcs'
import { useHostPeer } from '@/zustand/store/useHostPeer'
import { getPrevPlayers } from './funcs/getPrevPlayers'
import { getPong } from './funcs/getPong'

/**
 * This function handles different peer datas.
 */
export const handlePeerDatas = (userID: string) => {
  decodedOnPeerData(useHostPeer.getState().get()!, (data) => {
    if (data.from !== 'host') return null
    grayLog(`RECEIVED ${data.event} DATA FROM HOST`, data)

    getPainterDraw(data)
    getLeftPlayers(data)
    getJoinedPlayers(data)
    getPrevPlayers(data, userID)
    getChats(data, userID)
    getPong(data)
  })
}
