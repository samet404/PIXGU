'use client'

import { useEffectOnce } from '@/hooks/useEffectOnce'
import { postMsgToCanvasWorker, postMsgToHostTimerWorker } from '@/workers'
import { useHostingHealth } from '@/zustand/store/useHostingHealth'
import { useHostPainterData } from '@/zustand/store/useHostPainterData'
import { useIsGameStopped } from '@/zustand/store/useIsGameStopped'
import { useMatchStatus } from '@/zustand/store/useMatchStatus'
import { usePeers } from '@/zustand/store/usePeers'
import { usePlayers } from '@/zustand/store/usePlayers'
import { useWhoIsPainter } from '@/zustand/store/useWhoIsPainter'
import { useCoins } from '@/zustand/store/useCoins'
import { useSpectators } from '@/zustand/store/useSpectators'
import { useGuessedPlayers } from '@/zustand/store/useGuessedPlayers'
import { usePlayersPowerups } from '@/zustand/store/usePlayersPowerups'

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
