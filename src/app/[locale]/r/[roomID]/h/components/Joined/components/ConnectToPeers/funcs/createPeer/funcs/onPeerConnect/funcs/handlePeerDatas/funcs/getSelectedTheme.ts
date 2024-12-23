import { MATCH_TIME_MILISECONDS } from '@/constants'
import { storePaintersAccess } from '@/store'
import type { SelectThemeFromClient } from '@/types/webRTCConnData'
import { negativeLog, sendToAllPeers } from '@/utils'
import { postMsgToHostTimerWorker } from '@/workers'
import {
  useCoins,
  useHostPainterData,
  useMatchStatus,
  usePlayersOwnedPowerups,
  useTotalMatchCount,
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


  storePaintersAccess.selectedAsPainter(useWhoIsPainter.getState().value.painterID!, useTotalMatchCount.getState().value.userPainterAccesCount!)
  useHostPainterData.getState().painterSelectedTheme(data)

  sendToAllPeers({
    event: 'painterSelectedTheme',
  })

  useCoins.getState().newMatch()
  usePlayersOwnedPowerups.getState().newMatch()
}
