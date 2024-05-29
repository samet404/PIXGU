import {
  AblyClientContext,
  PeersContext,
  RoomIDContext,
} from '@/context/client'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { negativeLog } from '@/utils'
import { useContext } from 'react'

/**
 * This hook unsubscribes from the room channel and the user's connect channel.
 * It also destroys all peer connections.
 */
export const useMyLeave = () => {
  const ablyClient = useContext(AblyClientContext)!
  const peers = useContext(PeersContext)
  const roomID = useContext(RoomIDContext)

  useEffectOnce(() => {
    return () => {
      const myUserID = ablyClient.clientId
      const roomChannel = ablyClient.channels.get(`room:${roomID}`)
      const myConnectChannel = ablyClient.channels.get(
        `room:${roomID}:connect:${myUserID}`,
      )

      for (const userID of Object.keys(peers)) {
        peers[userID]?.peer.destroy()
        delete peers[userID]
      }

      roomChannel.presence.leave()
      roomChannel.unsubscribe()
      myConnectChannel.unsubscribe()
      ablyClient?.close()

      negativeLog(`YOU LEFT THE ROOM ${roomID}`)
    }
  })
}
