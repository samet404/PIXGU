import { postMsgToPlayerTimerWorker } from '@/workers'
import { useGuessChatLayout, useNewPainterPanel, useOwnedPowerups, usePainterSelectingRemainTime, useRoomGuessChatMsgsStore, useRoomWinnersChatMsgsStore, useSelectThemePanel, useWinnersChatLayout } from '@/zustand/store'

export const getPainterSelectedThemeTimeIsUp = async () => {
  postMsgToPlayerTimerWorker({
    event: 'stop',
    ID: 'PAINTER_SELECTING_REMAIN_TIME'
  })
  usePainterSelectingRemainTime.getState().reset()
  useNewPainterPanel.getState().close()
  useSelectThemePanel.getState().close()
  useRoomGuessChatMsgsStore.getState().reset()
  useRoomWinnersChatMsgsStore.getState().reset()
  useOwnedPowerups.getState().newMatch()
}
