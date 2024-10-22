import type { Guest } from '@/types'
import {
  useBrokenUserPfps,
  useCanvasesMainData,
  useHostPeer,
  useIsOnlineStore,
  useMyCoin,
  usePeers,
  usePing,
  usePlayers,
  useRoomWinnersChatMsgsStore,
  useSocketIO,
} from '@/zustand/store'

export const hostLeft = () => {
  const resetPlayers = usePlayers.getState().reset
  const resetPeers = usePeers.getState().reset
  const resetBrokenPlayersPfp = useBrokenUserPfps.getState().reset
  const resetWinnersChat = useRoomWinnersChatMsgsStore.getState().reset
  const resetIsOnline = useIsOnlineStore.getState().reset
  const resetPing = usePing.getState().reset
  const resetMyCoin = useMyCoin.getState().reset
  const resetCanvasesMainData = useCanvasesMainData.getState().reset
  const resetHostPeer = useHostPeer.getState().reset

  useSocketIO.getState().io!.on('host-left', (host: Guest) => {
    resetPlayers()
    resetPeers()
    resetBrokenPlayersPfp()
    resetWinnersChat()
    resetIsOnline()
    resetPing()
    resetMyCoin()
    resetCanvasesMainData()
    resetHostPeer()
    console.log('host left')
    useHostPeer.getState().set({ status: 'finding host' })
  })
}
