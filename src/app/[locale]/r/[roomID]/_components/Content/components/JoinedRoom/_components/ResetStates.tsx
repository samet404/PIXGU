'use client'

import { useEffectReturnOnce } from '@/hooks/useEffectReturn'
import {
  usePeers,
  usePlayers,
  useBrokenPlayersPfp,
  useRoomWinnersChatMsgsStore,
  useIsOnlineStore,
  useMyCoin,
  usePing,
  useCanvasesMainData,
  useHostPeer,
} from '@/zustand/store'

export const ResetStates = () => {
  const resetPlayers = usePlayers.getState().reset
  const resetPeers = usePeers.getState().reset
  const resetBrokenPlayersPfp = useBrokenPlayersPfp.getState().reset
  const resetWinnersChat = useRoomWinnersChatMsgsStore.getState().reset
  const resetIsOnline = useIsOnlineStore.getState().reset
  const resetPing = usePing.getState().reset
  const resetMyCoin = useMyCoin.getState().reset
  const resetCanvasesMainData = useCanvasesMainData.getState().reset
  const resetHostPeer = useHostPeer.getState().reset

  useEffectReturnOnce(() => {
    resetPlayers()
    resetPeers()
    resetBrokenPlayersPfp()
    resetWinnersChat()
    resetIsOnline()
    resetPing()
    resetMyCoin()
    resetCanvasesMainData()
    resetHostPeer()
  })

  return null
}
