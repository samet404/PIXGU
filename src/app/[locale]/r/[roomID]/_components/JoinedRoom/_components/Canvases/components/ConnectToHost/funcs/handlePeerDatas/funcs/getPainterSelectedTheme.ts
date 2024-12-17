import { postMsgToPlayerTimerWorker } from '@/workers'
import {
  useCoins,
  useMatchStatusClient,
  useMyCoin,
  useNewPainterPanel,
  useOwnedPowerups,
  usePlayersOwnedPowerups,
  useRoomGuessChatMsgsStore,
  useSelectThemePanel,
  useWhoIsPainterClient,
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

  useCoins.getState().newMatch()
  useMyCoin.getState().newMatch()
  usePlayersOwnedPowerups.getState().newMatch()
  useOwnedPowerups.getState().newMatch()
  useWhoIsPainterClient.getState().selectedTheme()
  useNewPainterPanel.getState().close()
  useSelectThemePanel.getState().close()
  useRoomGuessChatMsgsStore.getState().reset()
  useRoomGuessChatMsgsStore.getState().reset()
}
