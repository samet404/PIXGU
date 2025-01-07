import type { Guessed } from '@/types'
import { useGuessedPlayers, usePlayersPowerups } from '@/zustand/store'

export const getGuessed = (data: Guessed['data']) => {
  useGuessedPlayers.getState().guessed(data.ID)
  usePlayersPowerups.getState().setWinnersPowerups(data.ID)
}
