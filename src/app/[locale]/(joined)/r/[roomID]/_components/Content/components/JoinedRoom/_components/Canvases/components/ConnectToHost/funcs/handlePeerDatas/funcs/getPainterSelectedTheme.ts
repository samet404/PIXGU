import {
  useMatchStatusClient,
  useNewPainterPanel,
  useRoomGuessChatMsgsStore,
  useSelectThemePanel,
} from '@/zustand/store'

export const getPainterSelectedTheme = () => {
  useMatchStatusClient.getState().startInterval()
  useNewPainterPanel.getState().close()
  useSelectThemePanel.getState().close()
  useRoomGuessChatMsgsStore.getState().reset()
  useRoomGuessChatMsgsStore.getState().reset()
}
