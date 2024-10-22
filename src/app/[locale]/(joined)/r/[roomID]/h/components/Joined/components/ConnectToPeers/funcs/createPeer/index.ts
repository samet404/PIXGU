import type { Guest } from '@/types'
import { onPeerConnect, onPeerClose, onPeerError, onPeerSignal } from './funcs'
import { simplePeer } from '@/utils/simplePeer'
import { usePeers } from '@/zustand/store'
import type { User } from 'lucia'

/**
 * Create a webrtc peer connection to the given user.
 */
export const createPeer = (roomID: string, user: User | Guest) => {
  const peer = simplePeer({
    initiator: true,
  })
  console.log('create peer')
  const ID = 'id' in user ? user.id : user.ID

  usePeers.getState().add({
    ID,
    peer,
  })

  onPeerSignal(peer, ID)
  onPeerConnect(peer, ID, roomID, user)
  onPeerError(peer, ID)
  onPeerClose(peer, ID, roomID)
}
