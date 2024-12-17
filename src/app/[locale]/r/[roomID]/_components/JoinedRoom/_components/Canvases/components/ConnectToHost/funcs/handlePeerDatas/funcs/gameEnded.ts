import type { GameEnded } from '@/types/webRTCConnData'
import { useAmISpectator, useGameEndedPanel, useNewPainterPanel, useSelectThemePanel, useSpectators, useWhoIsPainterClient, useXY } from '@/zustand/store'
import { resetMatchStates } from '@/helpers/room'
import { postMsgToPlayerTimerWorker } from '@/workers'

export const gameEnded = (data: GameEnded['data']) => {
  useGameEndedPanel.getState().open(data)
  postMsgToPlayerTimerWorker({
    ID: 'GAME_ENDED',
    event: 'start',
    ms: 50,
    type: 'interval'
  })
  resetMatchStates()
  useSpectators.getState().reset()
  useAmISpectator.getState().reset()
  useNewPainterPanel.getState().reset()
  useSelectThemePanel.getState().reset()
  useWhoIsPainterClient.getState().reset()
  useXY.getState().reset()
}