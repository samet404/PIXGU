import type { User } from 'lucia'
import { simplePeer, positiveLog } from '@/utils'
import { usePeers } from '@/zustand/store'
import { onPeerSignal } from './onPeerSignal'
import { onPeerError } from './onPeerError'
import { onPeerConnect } from './onPeerConnect'
import { onPeerClose } from './onPeerClose'

export const memberAdded = (
  member: {
    id: string
    info: User
  },
  myUserID: string,
  roomID: string,
) => {
  console.log('memberAdded', member)
  const userID = member.id
  if (userID === myUserID) return null

  positiveLog(`USER ${userID} ENTERED >`)
  positiveLog(`INITIATING PEER CONNECTION TO ${userID}`)

  const peer = simplePeer({
    initiator: true,
  })

  usePeers.getState().add({
    ID: userID,
    peer,
  })

  onPeerSignal(peer, userID, roomID)
  onPeerError(peer, userID)
  onPeerConnect(peer, userID, member.info)
  onPeerClose(peer, userID)
}
