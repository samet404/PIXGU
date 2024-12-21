import { filterObj } from '@/utils/filterObj'
import { grayLog } from '@/utils/grayLog'
import { sendToPeer } from '@/utils/sendToPeer'
import { usePeers, usePlayers, type Player } from '@/zustand/store'

export const sendPrevPlayersToNewPlayer = (userID: string) => {
  const peer = usePeers.getState().get()[userID]?.peer
  if (!peer) {
    import('@/utils/negativeLog').then(({ negativeLog }) => {
      negativeLog('Peer not found when sending prev players to new player')
    })

    return
  }

  const playersDbInfo = usePlayers.getState().value.obj
  const secretKey = usePeers.getState().secretKeys[userID]!

  grayLog('SENDING PREV PLAYERS TO NEW PLAYER')
  sendToPeer(peer, secretKey, {
    event: 'prevPlayers',
    data: filterObj(playersDbInfo, ([k, v]) => k !== userID) as Record<
      string,
      Player
    >,
  })
}
