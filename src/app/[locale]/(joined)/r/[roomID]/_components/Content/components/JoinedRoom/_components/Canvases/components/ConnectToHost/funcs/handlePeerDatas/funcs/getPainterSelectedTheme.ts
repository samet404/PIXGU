import { postMsgToPlayerTimerWorker } from '@/workers'
import {
  useMatchStatusClient,
  useNewPainterPanel,
  useRoomGuessChatMsgsStore,
  useSelectThemePanel,
} from '@/zustand/store'

export const getPainterSelectedTheme = () => {
  useMatchStatusClient.getState().startMatch()
  postMsgToPlayerTimerWorker({
    ID: 'MATCH_REMAIN_TIME',
    event: 'start',
    ms: 1000,
    type: 'interval'
  })
  postMsgToPlayerTimerWorker({
    ID: 'PAINTER_SELECTING_REMAIN_TIME',
    event: 'stop',
  })

  useNewPainterPanel.getState().close()
  useSelectThemePanel.getState().close()
  useRoomGuessChatMsgsStore.getState().reset()
  useRoomGuessChatMsgsStore.getState().reset()
}
