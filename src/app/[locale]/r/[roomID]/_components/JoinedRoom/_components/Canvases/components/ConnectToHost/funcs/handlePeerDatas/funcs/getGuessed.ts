import type { Guessed } from '@/types'
import { usePlayersPowerups } from '@/zustand/store/usePlayersPowerups'
import { useGuessedPlayers } from '@/zustand/store/useGuessedPlayers'

export const getGuessed = (data: Guessed['data']) => {
  useGuessedPlayers.getState().guessed(data.ID)
  usePlayersPowerups.getState().setWinnersPowerups(data.ID)
}
