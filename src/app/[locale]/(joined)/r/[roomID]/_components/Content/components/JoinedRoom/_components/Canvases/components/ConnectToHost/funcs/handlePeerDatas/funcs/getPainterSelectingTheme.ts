import { postMsgToPlayerTimerWorker } from '@/workers';
import { useNewPainterPanel, usePainterSelectingRemainTime, useWhoIsPainterClient } from '@/zustand/store';

export const getPainterSelectingTheme = async () => {
  usePainterSelectingRemainTime.getState().reset()
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