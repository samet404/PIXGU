import type { Guessed } from '@/types/webRTCConnData'
import { useGuessedPlayers } from '@/zustand/store'

export const getGuessed = (data: Guessed['data']) =>
  useGuessedPlayers.getState().guessed(data.ID)
