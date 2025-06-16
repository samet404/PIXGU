import type { Guest } from '@/types'
import { useBrokenUserPfps } from '@/zustand/store/useBrokenUserPfps'
import { useRoomGeneralChatMsgsStore } from '@/zustand/store/useRoomGeneralChatMsgs'
import { useIsOnlineStore } from '@/zustand/store/useIsOnlineStore'
import { useMyCoin } from '@/zustand/store/useMyCoin'
import { usePing } from '@/zustand/store/usePing'
import { useCanvasesMainData } from '@/zustand/store/useCanvasesMainData'
import { useHostPeer } from '@/zustand/store/useHostPeer'
import { usePlayers } from '@/zustand/store/usePlayers'
import { usePeers } from '@/zustand/store/usePeers'
import { useSocketIO } from '@/zustand/store/useSocketIO'

export const hostLeft = () => {
  const resetPlayers = usePlayers.getState().reset
  const resetPeers = usePeers.getState().reset
  const resetBrokenPlayersPfp = useBrokenUserPfps.getState().reset
  const resetgeneralChat = useRoomGeneralChatMsgsStore.getState().reset
  const resetIsOnline = useIsOnlineStore.getState().reset
  const resetPing = usePing.getState().reset
  const resetMyCoin = useMyCoin.getState().reset
  const resetCanvasesMainData = useCanvasesMainData.getState().reset
  const resetHostPeer = useHostPeer.getState().reset

  useSocketIO.getState().io!.on('host-left', (host: Guest) => {
    resetPlayers()
    resetPeers()
    resetBrokenPlayersPfp()
    resetgeneralChat()
    resetIsOnline()
    resetPing()
    resetMyCoin()
    resetCanvasesMainData()
    resetHostPeer()
    console.log('host left')
    useHostPeer.getState().set({ status: 'finding host' })
  })
}
