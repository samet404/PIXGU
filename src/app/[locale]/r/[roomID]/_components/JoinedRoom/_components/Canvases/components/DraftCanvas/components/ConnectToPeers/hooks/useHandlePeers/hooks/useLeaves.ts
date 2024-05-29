import type { Message } from 'ably'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { subscribeAblyPresence } from '@/utils/subscribeAblyPresence'
import { useContext } from 'react'
import { negativeLog } from '@/utils'
import {
  AblyClientContext,
  PeersContext,
  RoomIDContext,
} from '@/context/client'

/**
 * This hook subscribes to the 'leave' presence event on the room channel.
 * When a user leaves the room, the peer connection is destroyed. And everything related to that user is removed.
 *
 * @param peersRef - The ref object containing the peer connections
 */
export const useLeaves = () => {
  const ablyClient = useContext(AblyClientContext)!
  const roomID = useContext(RoomIDContext)
  const peers = useContext(PeersContext)

  useEffectOnce(() => {
    const roomChannel = ablyClient.channels.get(`room:${roomID}`)

    subscribeAblyPresence(roomChannel, 'leave', (msg: Message) => {
      const userID = msg.clientId!
      negativeLog(`USER ${userID} LEFT`)

      peers[userID]!.peer.destroy()
      delete peers[userID]

      negativeLog(`PEER CONNECTION TO ${userID} DESTROYED `)
    })
  })
}
