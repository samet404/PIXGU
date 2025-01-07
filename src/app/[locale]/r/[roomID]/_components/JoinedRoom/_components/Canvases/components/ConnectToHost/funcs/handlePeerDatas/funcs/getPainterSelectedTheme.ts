import { storePaintersAccess } from '@/store'
import { postMsgToPlayerTimerWorker } from '@/workers'
import {
  useCoins,
  useMatchStatusClient,
  useMyCoin,
  useNewPainterPanel,
  usePlayers,
  usePlayersPowerups,
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


  const painterID = useWhoIsPainterClient.getState().value.painterID!

  usePlayers.getState().getPlayersIDs().forEach(ID => {
    if (ID === painterID) return
    usePlayersPowerups.getState().setGuessrPowerups(ID)
  })

  usePlayersPowerups.getState().setPainterPowerups(painterID)

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
