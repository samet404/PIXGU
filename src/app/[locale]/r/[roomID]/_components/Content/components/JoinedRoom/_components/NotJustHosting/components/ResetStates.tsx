'use client'

import { useEffectReturnOnce } from '@/hooks/useEffectReturn'
import {
  usePeers,
  usePlayers,
  useBrokenPlayersPfp,
  useIsGamePaused,
  useIsGuessChatOpen,
  useDarkZoneChatMsgsStore,
  useRoomWinnersChatMsgsStore,
  useIsOnlineStore,
  usePainterData,
  useMyCoin,
  usePing,
  useCanvasesMainData,
  useHostPeer,
} from '@/zustand/store'

export const ResetStates = () => {
  const resetPlayers = usePlayers.getState().reset
  const resetPeers = usePeers.getState().reset
  const resetBrokenPlayersPfp = useBrokenPlayersPfp.getState().reset
  const resetIsGamePaused = useIsGamePaused.getState().reset
  const resetGuessChat = useIsGuessChatOpen.getState().reset
  const resetDarkZoneChat = useDarkZoneChatMsgsStore.getState().reset
  const resetWinnersChat = useRoomWinnersChatMsgsStore.getState().reset
  const resetIsOnline = useIsOnlineStore.getState().reset
  const resetPainterData = usePainterData.getState().reset
  const resetPing = usePing.getState().reset
  const resetMyCoin = useMyCoin.getState().reset
  const resetCanvasesMainData = useCanvasesMainData.getState().reset
  const resetHostPeer = useHostPeer.getState().reset

  useEffectReturnOnce(() => {
    resetPlayers()
    resetPeers()
    resetBrokenPlayersPfp()
    resetIsGamePaused()
    resetGuessChat()
    resetDarkZoneChat()
    resetWinnersChat()
    resetIsOnline()
    resetPainterData()
    resetPing()
    resetMyCoin()
    resetCanvasesMainData()
    resetHostPeer()
  })

  return null
}
