import { postMsgToPlayerTimerWorker } from '@/workers'
import { useNewPainterPanel, usePainterSelectingRemainTime, useRoomGuessChatMsgsStore, useRoomGeneralChatMsgsStore, useSelectThemePanel } from '@/zustand/store'

export const getPainterSelectedThemeTimeIsUp = () => {
  postMsgToPlayerTimerWorker({
    event: 'stop',
    ID: 'PAINTER_SELECTING_REMAIN_TIME'
  })
  usePainterSelectingRemainTime.getState().reset()
  useNewPainterPanel.getState().close()
  useSelectThemePanel.getState().close()
  useRoomGuessChatMsgsStore.getState().reset()
  useRoomGeneralChatMsgsStore.getState().reset()
}
