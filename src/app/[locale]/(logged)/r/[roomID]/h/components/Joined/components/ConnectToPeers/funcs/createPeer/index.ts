import { onPeerConnect, onPeerClose, onPeerError, onPeerSignal } from './funcs'
import { simplePeer } from '@/utils/simplePeer'
import { usePeers } from '@/zustand/store'
import type { User } from 'lucia'

/**
 * Create a webrtc peer connection to the given user.
 */
export const createPeer = (roomID: string, user: User) => {
  const peer = simplePeer({
    initiator: true,
  })

  usePeers.getState().add({
    ID: user.id,
    peer,
  })

  onPeerSignal(peer, user.id)
  onPeerConnect(peer, user.id, roomID, user)
  onPeerError(peer, user.id)
  onPeerClose(peer, user.id, roomID)
}
