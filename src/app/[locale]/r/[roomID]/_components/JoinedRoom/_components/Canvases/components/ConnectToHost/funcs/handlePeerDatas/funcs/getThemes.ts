import { resetMatchStates } from '@/helpers/room'
import type { SelectThemeFromHost } from '@/types/webRTCConnData'
import { postMsgToPlayerTimerWorker } from '@/workers'
import { useSelectThemePanel } from '@/zustand/store'

export const getThemes = (data: SelectThemeFromHost['data']) => {
  useSelectThemePanel.getState().setSelectingTheme({ themes: data })
  postMsgToPlayerTimerWorker({
    ID: 'PAINTER_SELECTING_REMAIN_TIME',
    event: 'stop',
  })
  postMsgToPlayerTimerWorker({
    ID: 'PAINTER_SELECTING_REMAIN_TIME',
    event: 'start',
    ms: 50,
    type: 'interval'
  })
  resetMatchStates()
}