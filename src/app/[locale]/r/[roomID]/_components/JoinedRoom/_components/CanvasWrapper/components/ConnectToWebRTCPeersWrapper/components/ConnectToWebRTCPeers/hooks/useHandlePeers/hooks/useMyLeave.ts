import type { PeersRef } from '@/types/webRTCPeersRef'
import type { RealtimeChannel } from 'ably'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useSetAtom } from 'jotai'

/**
 * This hook unsubscribes from the room channel and the user's connect channel.
 * It also destroys all peer connections.
 *
 * @param roomChannel - The room channel
 * @param myConnectChannel - The user's connect channel
 * @param peersRef - The ref object containing the peer connections
 */
export const useMyLeave = (
  roomChannel: RealtimeChannel,
  myConnectChannel: RealtimeChannel,
  peersRef: PeersRef,
) => {
  useEffectOnce(() => {
    return () => {
      for (const userID of Object.keys(peersRef.current)) {
        peersRef.current[userID]?.peer.destroy()
      }

      peersRef.current = {}

      roomChannel.presence.leave()
      roomChannel.unsubscribe()
      myConnectChannel.unsubscribe()
    }
  })
}
