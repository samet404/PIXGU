'use client'

import { useEffectReturnOnce } from '@/hooks/useEffectReturn'
import { terminateCanvasWorker } from '@/workers'
import { usePeers } from '@/zustand/store/usePeers'
import { usePlayers } from '@/zustand/store/usePlayers'
import { useBrokenUserPfps } from '@/zustand/store/useBrokenUserPfps'
import { useRoomGeneralChatMsgsStore } from '@/zustand/store/useRoomGeneralChatMsgs'
import { useIsOnlineStore } from '@/zustand/store/useIsOnlineStore'
import { useMyCoin } from '@/zustand/store/useMyCoin'
import { usePing } from '@/zustand/store/usePing'
import { useCanvasesMainData } from '@/zustand/store/useCanvasesMainData'
import { useHostPeer } from '@/zustand/store/useHostPeer'
import { useCoins } from '@/zustand/store/useCoins'
import { useMatchStatus } from '@/zustand/store/useMatchStatus'
import { useIsGameStopped } from '@/zustand/store/useIsGameStopped'
import { usePowerups } from '@/zustand/store/usePowerups'

export const ResetStates = () => {
  const resetPlayers = usePlayers.getState().reset
  const resetPeers = usePeers.getState().reset
  const resetBrokenPlayersPfp = useBrokenUserPfps.getState().reset
  const resetgeneralChat = useRoomGeneralChatMsgsStore.getState().reset
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
    resetgeneralChat()
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
