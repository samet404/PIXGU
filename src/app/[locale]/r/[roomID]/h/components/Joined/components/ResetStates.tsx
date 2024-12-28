'use client'

import { useEffectOnce } from '@/hooks/useEffectOnce'
import { postMsgToCanvasWorker, postMsgToHostTimerWorker } from '@/workers'
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
  usePlayersPowerups,
} from '@/zustand/store'

export const ResetStates = () => {
  useEffectOnce(() => {
    return () => {
      postMsgToCanvasWorker({ e: 'reset' })
      postMsgToHostTimerWorker({ event: 'clear' })
      useHostPainterData.getState().reset()
      useMatchStatus.getState().reset()
      useHostingHealth.getState().reset()
      usePlayersPowerups.getState().reset()
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
