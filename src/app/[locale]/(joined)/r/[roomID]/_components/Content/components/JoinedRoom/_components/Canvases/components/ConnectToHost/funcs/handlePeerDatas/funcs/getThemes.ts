import { resetMatchStates } from '@/helpers/room'
import type { SelectThemeFromHost } from '@/types/webRTCConnData'
import { useSelectThemePanel } from '@/zustand/store'

export const getThemes = (data: SelectThemeFromHost['data']) => {
  useSelectThemePanel.getState().setSelectingTheme({ themes: data })

  resetMatchStates()
}