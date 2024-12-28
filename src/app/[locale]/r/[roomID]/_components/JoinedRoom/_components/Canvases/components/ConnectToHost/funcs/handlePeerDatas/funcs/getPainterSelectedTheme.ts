import { storePaintersAccess } from '@/store'
import { postMsgToPlayerTimerWorker } from '@/workers'
import {
  useCoins,
  useMatchStatusClient,
  useMyCoin,
  useNewPainterPanel,
  usePowerups,
  useRoomGuessChatMsgsStore,
  useSelectThemePanel,
  useTotalMatchCount,
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


  storePaintersAccess.selectedAsPainter(useWhoIsPainterClient.getState().value.painterID!, useTotalMatchCount.getState().value.userPainterAccesCount!)

  const amIPainter = useWhoIsPainterClient.getState().value.amIPainter
  if (amIPainter) usePowerups.getState().setPainterCards()
  else usePowerups.getState().setGuessrCards()

  useCoins.getState().newMatch()
  useMyCoin.getState().newMatch()

  useWhoIsPainterClient.getState().selectedTheme()
  useNewPainterPanel.getState().close()
  useSelectThemePanel.getState().close()
  useRoomGuessChatMsgsStore.getState().reset()
  useRoomGuessChatMsgsStore.getState().reset()
}
