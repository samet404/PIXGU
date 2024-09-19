import { decodedOnPeerData, grayLog, negativeLog } from '@/utils'
import { chat } from './funcs/chat'
import { usePeers, useSpectators } from '@/zustand/store'
import { pong } from './funcs/pong'
import { painterDraw } from './funcs/painterDraw'
import { getSelectedTheme } from './funcs/getSelectedTheme'
import { painterTrash } from './funcs/painterTrash'

export const handlePeerDatas = (userID: string, roomID: string) => {
  const peers = usePeers.getState().get()

  decodedOnPeerData<'fromClient'>(peers[userID]!.peer, (rtcData) => {
    const { event } = rtcData
    // #region checking type
    grayLog(`RECEIVED ${event} DATA FROM ${userID}`, rtcData)
    if (event !== 'ping' && useSpectators.getState().isSpectator(userID)) {
      return
    }
    // #endregion

    switch (event) {
      case 'ping':
        pong(rtcData.data, userID)
        break
      case 'guessChat':
        chat(rtcData.data, event, userID, roomID)
        break
      case 'winnersChat':
        chat(rtcData.data, event, userID, roomID)
        break
      case 'selectTheme':
        getSelectedTheme(rtcData.data, userID)
        break
      case 'painterDraw':
        painterDraw(rtcData.data, userID)
        break
      case 'painterTrash':
        painterTrash()
        break
      default:
        negativeLog('RECEIVED NOT UNKNOWN EVENT FROM CLIENT', rtcData)
        break
    }
  })
}
