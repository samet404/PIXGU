import type { GameEnded } from '@/types/webRTCConnData'
import { useGameEndedPanel } from '@/zustand/store'

export const gameEnded = (data: GameEnded['data']) =>
  useGameEndedPanel.getState().open(data)
