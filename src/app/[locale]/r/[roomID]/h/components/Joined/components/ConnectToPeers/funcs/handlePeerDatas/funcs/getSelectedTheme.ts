import type { WebRTCConnData } from '@/types/webRTCConnData'
import { negativeLog } from '@/utils/negativeLog'
import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { useHostPainterData } from '@/zustand/store/useHostPainterData'

export const getSelectedTheme = (rtcData: WebRTCConnData, userID: string) => {
  const { from, event } = rtcData
  if (event === 'selectTheme' && from === 'client') {
    const { data } = rtcData

    const hostPainterData = useHostPainterData.getState().value
    if (hostPainterData.status !== 'painterSelectingTheme') return

    const { themes } = hostPainterData

    if (!themes) negativeLog('Received selected theme when there is no themes')
    if (!themes.includes(data))
      negativeLog(
        'Selected theme received but the theme is not among the sent themes',
      )

    useHostPainterData.getState().set({
      status: 'painterSelectedTheme',
      themes: themes,
      selectedTheme: data,
    })

    sendToAllPeers(
      {
        from: 'host',
        event: 'painterSelectedTheme',
      },
      {
        except: [userID],
      },
    )
  }
}
