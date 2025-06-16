import { postMsgToPlayerTimerWorker } from '@/workers';
import { useNewPainterPanel } from '@/zustand/store/useNewPainterPanel';
import { usePainterSelectingRemainTime } from '@/zustand/store/usePainterSelectingRemainTime';
import { useWhoIsPainterClient } from '@/zustand/store/useWhoIsPainterClient';

export const getPainterSelectingTheme = () => {
  usePainterSelectingRemainTime.getState().reset()
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
  useNewPainterPanel
    .getState()
    .setSelectingTheme()
  useWhoIsPainterClient.getState().selectingTheme()
}