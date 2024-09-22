import type { SelectThemeFromClient } from '@/types/webRTCConnData'
import { negativeLog, sendToAllPeers } from '@/utils'
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
  const isPainter = useWhoIsPainter.getState().isPainter(userID)
  if (!isPainter) return

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

  useMatchStatus.getState().newMatch()
  useMatchStatus.getState().setTimeout({ roomID })

  clearTimeout(hostPainterData.timeIsUpTimeout)
  useHostPainterData.getState().set({
    status: 'painterSelectedTheme',
    themes: themes,
    selectedTheme: data,
  })

  sendToAllPeers({
    from: 'host',
    event: 'painterSelectedTheme',
  })
}
