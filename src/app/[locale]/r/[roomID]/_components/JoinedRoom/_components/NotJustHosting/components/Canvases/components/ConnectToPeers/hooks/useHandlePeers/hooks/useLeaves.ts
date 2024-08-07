import type { Message } from 'ably'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { subscribeAblyPresence } from '@/utils/subscribeAblyPresence'
import { useContext } from 'react'
import { negativeLog } from '@/utils'
import { AblyClientContext, RoomIDContext } from '@/context/client'

/**
 * This hook handles everything about leaving room.
 * Subscribes to the 'leaves' presence event on the room channel and updates current players states.
 * When a other user leaves the room, the peer connection is destroyed. And everything related to that user is removed.
 */
export const useLeaves = () => {
  const ablyClient = useContext(AblyClientContext)!
  const roomID = useContext(RoomIDContext)

  useEffectOnce(() => {
    const roomChannel = ablyClient.channels.get(`room:${roomID}`)

    subscribeAblyPresence(roomChannel, 'leave', async (msg: Message) => {
      const userID = msg.clientId!
      negativeLog(`USER ${userID} LEFT <`)
    })
  })
}
