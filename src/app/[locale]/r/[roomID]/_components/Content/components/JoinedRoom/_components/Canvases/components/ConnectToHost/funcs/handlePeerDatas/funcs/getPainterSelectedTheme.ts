import {
  useMatchStatusClient,
  useNewPainterPanel,
  useSelectThemePanel,
} from '@/zustand/store'

export const getPainterSelectedTheme = () => {
  useMatchStatusClient.getState().newMatch()
  useNewPainterPanel.getState().close()
  useSelectThemePanel.getState().close()
}
