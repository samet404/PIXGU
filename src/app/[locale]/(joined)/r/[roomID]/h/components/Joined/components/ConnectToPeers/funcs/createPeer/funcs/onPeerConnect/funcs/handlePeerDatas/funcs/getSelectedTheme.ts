import { MATCH_TIME_MILISECONDS, MATCH_TIME_MINUTES } from '@/constants'
import type { SelectThemeFromClient } from '@/types/webRTCConnData'
import { negativeLog, sendToAllPeers } from '@/utils'
import { postMsgToHostTimerWorker } from '@/workers'
import {
  useHostPainterData,
  useMatchStatus,
  useWhoIsPainter,
} from '@/zustand/store'

export const getSelectedTheme = (
  data: SelectThemeFromClient['data'],
  userID: string,
  roomID: string,
) => {
  if (!useWhoIsPainter.getState().isPainter(userID)) return

  const hostPainterData = useHostPainterData.getState().value
  if (hostPainterData.status !== 'painterSelectingTheme') return

  const { themes } = hostPainterData

  if (!themes) {
    negativeLog('Received selected theme when there is no themes')
    return
  }

  if (!themes.includes(data)) {
    negativeLog(
      'Selected theme received but the theme is not among the sent themes',
    )
    return
  }

  useMatchStatus.getState().timeoutStarted(roomID)
  postMsgToHostTimerWorker({
    ID: 'PAINTER_TIME_IS_UP',
    event: 'stop'
  })
  postMsgToHostTimerWorker({
    ID: 'MATCH_ENDED',
    event: 'start',
    type: 'timeout',
    ms: MATCH_TIME_MILISECONDS,
  })

  postMsgToHostTimerWorker({
    ID: 'MATCH_REMAIN_TIME',
    event: 'start',
    type: 'interval',
    ms: 1000,
  })



  useHostPainterData.getState().painterSelectedTheme(data)

  sendToAllPeers({

    event: 'painterSelectedTheme',
  })
}
