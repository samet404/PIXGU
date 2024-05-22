import type { PeersRef } from '@/types/webRTCPeersRef'
import type { Message, RealtimeChannel } from 'ably'
import { removePlayerAtom } from '@/app/[locale]/r/[roomID]/_components/JoinedRoom/_atoms'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { filterObj } from '@/utils'
import { subscribeAblyPresence } from '@/utils/subscribeAblyPresence'
import { useSetAtom } from 'jotai'

/**
 * This hook subscribes to the 'leave' presence event on the room channel.
 * When a user leaves the room, the peer connection is destroyed. And everything related to that user is removed.
 *
 * @param roomChannel - The room channel
 * @param peersRef - The ref object containing the peer connections
 */
export const useLeaves = ({ roomChannel, peersRef }: Args) => {
  const removePlayer = useSetAtom(removePlayerAtom)

  useEffectOnce(() => {
    subscribeAblyPresence(roomChannel, 'leave', (msg: Message) => {
      const userID = msg.clientId!
      console.log(`USER ${userID} LEFT`)

      const peers = peersRef.current!

      peers[userID]!.peer.destroy()
      peersRef.current = filterObj<typeof peers>(peers, ([k]) => k !== userID)
      removePlayer(userID)
    })
  })
}

type Args = {
  roomChannel: RealtimeChannel
  peersRef: PeersRef
}
