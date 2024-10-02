import type { Guessed } from '@/types/webRTCConnData'
import { useGuessedPlayers } from '@/zustand/store'

export const getGuessed = async (data: Guessed['data']) =>
  useGuessedPlayers.getState().guessed(data.ID)
