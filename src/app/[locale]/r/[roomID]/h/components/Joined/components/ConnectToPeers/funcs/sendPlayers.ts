import { grayLog } from '@/utils/grayLog'
import { sendToPeer } from '@/utils/sendToPeer'
import { usePeers, usePlayers } from '@/zustand/store'

export const sendPlayers = (userID: string) => {
  const peer = usePeers.getState().get()[userID]?.peer
  if (!peer) return

  const playersDbInfo = usePlayers.getState().get().players

  grayLog('SENDING ALL PLAYERS DB INFO TO PEER')
  sendToPeer(peer, {
    from: 'host',
    event: 'prevPlayers',
    data: playersDbInfo,
  })
}
