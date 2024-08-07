import type { RoomPlayersDbInfoOrderedByJoinTime } from '@/types/roomPlayersDbInfo'
import { grayLog } from '@/utils/grayLog'
import { sendToPeer } from '@/utils/sendToPeer'
import type SimplePeer from 'simple-peer'

export const sendAllPlayerDbInfos = (
  playersDbInfoOrderedByJoinTime: RoomPlayersDbInfoOrderedByJoinTime,
  peer: SimplePeer.Instance,
) => {
  grayLog('SENDING ALL PLAYERS DB INFO TO PEER')
  sendToPeer(peer, {
    from: 'host',
    event: 'PlayersDbInfoOrderedByJoinTime',
    data: { players: playersDbInfoOrderedByJoinTime.players },
  })
}
