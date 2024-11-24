import { chat, getBuyMarketItem, getPainterBucket, getPainterEraser, getPainterMouseDown, getPainterMouseUp, getPainterPencil, getSelectedTheme, getUsePowerup, painterTrash, pong } from './funcs'
import { onPeerData, grayLog, negativeLog } from '@/utils'
import { usePeers } from '@/zustand/store'

export const handlePeerDatas = (userID: string, roomID: string) => {
  const peers = usePeers.getState().get()

  onPeerData<'fromClient'>(peers[userID]!.peer, (rtcData) => {
    const { event } = rtcData
    grayLog(`RECEIVED ${event} DATA FROM ${userID}`, rtcData)

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
        getSelectedTheme(rtcData.data, userID, roomID)
        break
      case 'painterTrash':
        painterTrash(userID)
        break
      case 'painterEraser':
        getPainterEraser(rtcData.data, userID)
        break
      case 'painterPencil':
        getPainterPencil(rtcData.data, userID)
        break
      case 'painterBucket':
        getPainterBucket(rtcData.data, userID)
        break
      case 'buyMarketItem':
        getBuyMarketItem(rtcData.data, userID)
        break
      case 'usePowerup':
        getUsePowerup(rtcData.data, userID)
        break
      case 'painterMouseDown':
        getPainterMouseDown(rtcData.data, userID)
        break
      case 'painterEraserOrPencilOut':
        getPainterMouseUp(userID)
        break
      default:
        negativeLog('RECEIVED NOT UNKNOWN EVENT FROM CLIENT', rtcData)
        // if (env.NEXT_PUBLIC_NODE_ENV === 'production') useSocketIO.getState().io!.emit('block-user', userID)

        break
    }
  })
}
