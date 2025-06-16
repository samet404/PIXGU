import type { Guest, Locale } from '@/types'
import { onPeerConnect, onPeerClose, onPeerError, onPeerSignal } from './funcs'
import { useMatchStatus } from '@/zustand/store/useMatchStatus'
import { usePeers } from '@/zustand/store/usePeers'
import { useSocketIO } from '@/zustand/store/useSocketIO'
import PixguPeer from 'src/pixgu-peer/pixguPeer'

/**
 * Create a webrtc peer connection to the given user.
 */
export const createPeer = (
  roomID: string,
  uniqueSocketID: string,
  user: Guest,
  locale: Locale,
) => {
  const ID = 'id' in user ? user.id : user.ID

  if (useMatchStatus.getState().value.matchCount !== 0) {
    useSocketIO.getState().io!.emit('not-allowed', ID)
    return
  }

  const peer = new PixguPeer({
    initiator: true,
    channelConfig: {
      ordered: true,
    },
    objectMode: true,
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
