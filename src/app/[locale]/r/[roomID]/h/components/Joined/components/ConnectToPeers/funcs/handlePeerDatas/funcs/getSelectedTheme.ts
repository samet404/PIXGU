import type { SelectThemeFromClient } from '@/types/webRTCConnData'

export const getSelectedTheme = async (
  data: SelectThemeFromClient['data'],
  userID: string,
) => {
  const { negativeLog, sendToAllPeers } = await import('@/utils')
  const { useHostPainterData } = await import('@/zustand/store')

  const hostPainterData = useHostPainterData.getState().value
  if (hostPainterData.status !== 'painterSelectingTheme') return

  const { themes } = hostPainterData

  if (!themes) negativeLog('Received selected theme when there is no themes')
  if (!themes.includes(data))
    negativeLog(
      'Selected theme received but the theme is not among the sent themes',
    )

  clearTimeout(hostPainterData.timeIsUpTimeout)
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
