'use client'

import { useEffectOnce } from '@/hooks/useEffectOnce'
import {
  useHostingHealth,
  useHostPainterData,
  useIsGameStopped,
  useMatchStatus,
  usePeers,
  usePlayers,
  useWhoIsPainter,
  useCoins,
  useSpectators,
  useGuessedPlayers,
  usePlayersOwnedPowerups,
} from '@/zustand/store'

export const ResetStates = () => {
  useEffectOnce(() => {
    return () => {
      useHostPainterData.getState().reset()
      useMatchStatus.getState().reset()
      useHostingHealth.getState().reset()
      usePlayersOwnedPowerups.getState().reset()
      usePeers.getState().reset()
      usePlayers.getState().reset()
      useWhoIsPainter.getState().reset()
      useIsGameStopped.getState().reset()
      useCoins.getState().reset()
      useSpectators.getState().reset()
      useGuessedPlayers.getState().reset()
    }
  })

  return null
}
