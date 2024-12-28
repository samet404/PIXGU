'use client'

import { useEffectReturnOnce } from '@/hooks/useEffectReturn'
import { terminateCanvasWorker } from '@/workers'
import {
  usePeers,
  usePlayers,
  useBrokenUserPfps,
  useRoomWinnersChatMsgsStore,
  useIsOnlineStore,
  useMyCoin,
  usePing,
  useCanvasesMainData,
  useHostPeer,
  useCoins,
  useMatchStatus,
  useIsGameStopped,
  usePowerups,
} from '@/zustand/store'

export const ResetStates = () => {
  const resetPlayers = usePlayers.getState().reset
  const resetPeers = usePeers.getState().reset
  const resetBrokenPlayersPfp = useBrokenUserPfps.getState().reset
  const resetWinnersChat = useRoomWinnersChatMsgsStore.getState().reset
  const resetIsOnline = useIsOnlineStore.getState().reset
  const resetPing = usePing.getState().reset
  const resetMyCoin = useMyCoin.getState().reset
  const resetCanvasesMainData = useCanvasesMainData.getState().reset
  const resetHostPeer = useHostPeer.getState().reset
  const resetCoins = useCoins.getState().reset
  const resetMatchStates = useMatchStatus.getState().reset
  const resetIsGameStopped = useIsGameStopped.getState().reset
  const resetPowerups = usePowerups.getState().reset

  useEffectReturnOnce(() => {
    terminateCanvasWorker()
    resetPlayers()
    resetPeers()
    resetBrokenPlayersPfp()
    resetWinnersChat()
    resetIsOnline()
    resetPing()
    resetMyCoin()
    resetCanvasesMainData()
    resetHostPeer()
    resetPowerups()
    resetMatchStates()
    resetCoins()
    resetIsGameStopped()
  })

  return null
}
