import type { PainterCouldNotSelectTheme } from '@/types/webRTCConnData'
import { useMatchCount } from '@/zustand/store'

export const getPainterCouldNotSelectTheme = async (
  data: PainterCouldNotSelectTheme['data'],
  myUserID: string,
) => {
  const { useNewPainterPanel } = await import('@/zustand/store')
  const { useSelectThemePanel } = await import('@/zustand/store')
  const { useGuessChatLayout } = await import('@/zustand/store')
  const { useWinnersChatLayout } = await import('@/zustand/store')

  useMatchCount.getState().decrement()
  useNewPainterPanel.getState().close()
  useSelectThemePanel.getState().close()
  useGuessChatLayout.getState().setImNotGuessed()
  useWinnersChatLayout.getState().setImNotGuessed()
}
