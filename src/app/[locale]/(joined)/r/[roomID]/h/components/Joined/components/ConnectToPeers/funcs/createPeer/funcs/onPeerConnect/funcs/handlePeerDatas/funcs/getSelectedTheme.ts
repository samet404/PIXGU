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

  useMatchStatus.getState().startInterval(roomID)

  clearInterval(hostPainterData.timeIsUpInterval)
  useHostPainterData.getState().painterSelectedTheme(data)

  sendToAllPeers({
    from: 'host',
    event: 'painterSelectedTheme',
  })
}
