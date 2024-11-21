import type { PainterCouldNotSelectTheme } from '@/types/webRTCConnData'
import { useGuessChatLayout, useNewPainterPanel, useRoomGuessChatMsgsStore, useRoomWinnersChatMsgsStore, useSelectThemePanel, useWinnersChatLayout } from '@/zustand/store'

export const getPainterCouldNotSelectTheme = async (
  data: PainterCouldNotSelectTheme['data'],
  myUserID: string,
) => {

  useNewPainterPanel.getState().close()
  useSelectThemePanel.getState().close()
  useGuessChatLayout.getState().setImNotGuessed()
  useRoomGuessChatMsgsStore.getState().reset()
  useWinnersChatLayout.getState().setImNotGuessed()
  useRoomWinnersChatMsgsStore.getState().reset()
}
