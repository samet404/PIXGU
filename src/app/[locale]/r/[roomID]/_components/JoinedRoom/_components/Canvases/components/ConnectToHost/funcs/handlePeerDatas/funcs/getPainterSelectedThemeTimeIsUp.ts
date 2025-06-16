import { postMsgToPlayerTimerWorker } from '@/workers'
import { useNewPainterPanel } from '@/zustand/store/useNewPainterPanel'
import { usePainterSelectingRemainTime } from '@/zustand/store/usePainterSelectingRemainTime'
import { useRoomGuessChatMsgsStore } from '@/zustand/store/useRoomGuessChatMsgs'
import { useRoomGeneralChatMsgsStore } from '@/zustand/store/useRoomGeneralChatMsgs'
import { useSelectThemePanel } from '@/zustand/store/useSelectThemePanel'


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
