import type { PeersRef } from '@/types/webRTCPeersRef'
import type { RealtimeChannel } from 'ably'
import { deleteAllPlayersAtom } from '@/app/[locale]/r/[roomID]/_components/JoinedRoom/_atoms'
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
export const useMyLeave = ({
  roomChannel,
  myConnectChannel,
  peersRef,
}: Args) => {
  const deleteAllPlayers = useSetAtom(deleteAllPlayersAtom)

  useEffectOnce(() => {
    return () => {
      for (const userID of Object.keys(peersRef.current!)) {
        peersRef.current![
          userID as keyof typeof peersRef.current
        ]?.peer.destroy()
      }

      peersRef.current = {}

      roomChannel.presence.leave()
      roomChannel.unsubscribe()
      myConnectChannel.unsubscribe()
      deleteAllPlayers()
    }
  })
}

type Args = {
  roomChannel: RealtimeChannel
  myConnectChannel: RealtimeChannel
  peersRef: PeersRef
}
