import type { GameEnded } from '@/types/webRTCConnData'
import { useAmISpectator, useGameEndedPanel, useNewPainterPanel, useSelectThemePanel, useSpectators, useWhoIsPainterClient } from '@/zustand/store'
import { resetMatchStates } from '@/helpers/room'

export const gameEnded = (data: GameEnded['data']) => {
  useGameEndedPanel.getState().open(data)
  resetMatchStates()
  useSpectators.getState().reset()
  useAmISpectator.getState().reset()
  useNewPainterPanel.getState().reset()
  useSelectThemePanel.getState().reset()
  useWhoIsPainterClient.getState().reset()
}