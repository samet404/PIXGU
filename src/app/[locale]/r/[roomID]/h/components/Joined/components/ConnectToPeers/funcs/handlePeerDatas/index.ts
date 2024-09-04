import { decodedOnPeerData, grayLog } from '@/utils'
import { chat } from './funcs/chat'
import { usePeers, usePlayers, useSpectators } from '@/zustand/store'
import { pong } from './funcs/pong'
import { painterDraw } from './funcs/painterDraw'
import { getSelectedTheme } from './funcs/getSelectedTheme'
import { violetLog } from '@/utils/violetLog'

export const handlePeerDatas = (userID: string, roomID: string) => {
  const peers = usePeers.getState().get()

  decodedOnPeerData<'fromClient'>(peers[userID]!.peer, (rtcData) => {
    const { from, event, data } = rtcData
    // #region checking type
    grayLog(`RECEIVED ${event} DATA FROM ${userID}`, data)
    if (event !== 'ping' && useSpectators.getState().isSpectator(userID)) {
      violetLog('RECEIVED NOT EXPECTED DATA FROM SPECTATOR', data)
      return
    }
    if (from !== 'client') {
      violetLog('RECEIVED NOT EXPECTED DATA FROM HOST', data)
    }
    // #endregion

    switch (event) {
      case 'ping':
        pong(data, userID)
        break
      case 'guessChat':
        chat(data, event, userID, roomID)
        break
      case 'winnersChat':
        chat(data, event, userID, roomID)
        break
      case 'selectTheme':
        getSelectedTheme(data, userID)
        break
      case 'painterDraw':
        painterDraw(data, userID)
        break
      default:
        violetLog('RECEIVED NOT UNKNOWN EVENT FROM CLIENT', data)
        break
    }
  })
}
