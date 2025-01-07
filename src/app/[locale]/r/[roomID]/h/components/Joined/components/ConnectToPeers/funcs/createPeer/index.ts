import type { Guest, Locale } from '@/types'
import { onPeerConnect, onPeerClose, onPeerError, onPeerSignal } from './funcs'
import { simplePeer } from '@/utils/simplePeer'
import { useMatchStatus, usePeers, useSocketIO } from '@/zustand/store'
import type { User } from 'lucia'

/**
 * Create a webrtc peer connection to the given user.
 */
export const createPeer = (roomID: string, uniqueSocketID: string, user: User | Guest, locale: Locale) => {
  const ID = 'id' in user ? user.id : user.ID

  if (useMatchStatus.getState().value.matchCount !== 0) {
    useSocketIO.getState().io!.emit('not-allowed', ID)
    return
  }

  const peer = simplePeer({
    initiator: true,
  })

  usePeers.getState().add({
    ID,
    uniqueSocketID,
    peer,
  })

  onPeerSignal(peer, ID)
  onPeerConnect(peer, ID, roomID, user, locale)
  onPeerError(peer, ID)
  onPeerClose(peer, ID, roomID, locale)
}
