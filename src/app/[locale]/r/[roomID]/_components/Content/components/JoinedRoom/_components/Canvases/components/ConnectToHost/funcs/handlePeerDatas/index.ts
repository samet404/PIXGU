import { decodedOnPeerData, grayLog } from '@/utils'
import {
  getChats,
  getJoinedPlayers,
  getPainterDraw,
  getLeftPlayers,
  getPainter,
} from './funcs'
import { useHostPeer } from '@/zustand/store/useHostPeer'
import { getPrevPlayers } from './funcs/getPrevPlayers'
import { getPong } from './funcs/getPong'
import { getPauseMatch } from './funcs/getPauseMatch'
import { getResumeMatch } from './funcs/getResumeMatch'
import { getPainterSelectedTheme } from './funcs/getPainterSelectedTheme'
import { getThemes } from './funcs/getThemes'
import { getPainterSelectingTheme } from './funcs/getPainterSelectingTheme'
import { getPainterCouldNotSelectTheme } from './funcs/getPainterCouldNotSelectTheme'

/**
 * This function handles different peer datas.
 */
export const handlePeerDatas = (userID: string) => {
  decodedOnPeerData(useHostPeer.getState().get()!, (data) => {
    if (data.from !== 'host') return null
    grayLog(`RECEIVED ${data.event} DATA FROM HOST`, data)

    getPainterCouldNotSelectTheme(data, userID)
    getPainterSelectedTheme(data)
    getPainterSelectingTheme(data)
    getPauseMatch(data, userID)
    getResumeMatch(data, userID)
    getPainterDraw(data)
    getPainter(data, userID)
    getLeftPlayers(data)
    getJoinedPlayers(data)
    getPrevPlayers(data, userID)
    getChats(data, userID)
    getPong(data)
    getThemes(data, userID)
  })
}
