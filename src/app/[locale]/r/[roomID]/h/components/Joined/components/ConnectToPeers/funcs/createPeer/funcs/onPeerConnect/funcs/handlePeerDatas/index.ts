import { onPeerData, grayLog, negativeLog } from '@/utils'
import { usePeers } from '@/zustand/store/usePeers'
import { getUndoRedo } from './funcs/getUndoRedo'
import {
  chat,
  getPainterBucket,
  getPainterEraser,
  getPainterMouseDown,
  getPainterMouseUp,
  getPainterPencil,
  getSelectedTheme,
  getUsePowerup,
  painterTrash
} from './funcs'
import type { Locale } from '@/types/locale'

export const handlePeerDatas = (userID: string, roomID: string, locale: Locale) => {
  const peers = usePeers.getState().get()
  const secretKey = usePeers.getState().secretKeys[userID]

  if (!secretKey) {
    console.error('secretKey not found handling peer datas')
    return
  }

  onPeerData<'fromClient'>(peers[userID]!.peer, secretKey, (rtcData) => {
    const { event } = rtcData
    grayLog(JSON.stringify({
      name: 'WEBRTC_DATA_FROM_CLIENT',
      data: rtcData,
      receivedAt: Date.now(),
    }, null, 2))

    switch (event) {
      case 'guessChat':
        chat(rtcData.data, event, userID, locale)
        break
      case 'generalChat':
        chat(rtcData.data, event, userID, locale)
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
      case 'usePowerup':
        getUsePowerup(rtcData.data, userID, roomID, locale)
        break
      case 'painterMouseDown':
        getPainterMouseDown(rtcData.data, userID)
        break
      case 'painterEraserOrPencilOut':
        getPainterMouseUp(userID)
        break
      case 'undoRedo':
        getUndoRedo(rtcData.data, userID)
        break
      default:
        negativeLog('RECEIVED NOT UNKNOWN EVENT FROM CLIENT', rtcData)
        // if (env.NEXT_PUBLIC_NODE_ENV === 'production') useSocketIO.getState().io!.emit('block-user', userID)

        break
    }
  })
}
