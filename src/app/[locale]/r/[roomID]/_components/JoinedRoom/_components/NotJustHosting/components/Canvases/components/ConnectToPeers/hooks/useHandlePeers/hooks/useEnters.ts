import type { Message } from 'ably'
import { subscribeAblyPresence } from '@/utils/subscribeAblyPresence'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useContext } from 'react'
import { positiveLog } from '@/utils'
import { useRoomPlayersIDsStore } from '@/zustand/store/useRoomPlayersIDsStore'
import { RoomPlayersIDsOrderedByTimestampCtx } from '@/context/client'
import {
  AblyClientContext,
  RoomIDContext,
  UserIDContext,
} from '@/context/client'

/**
 * This hook handles everything about entering room.
 * Enters a room, subscribes to the 'enter' presence event on the room channel and updates current players states.
 * When a other user enters the room, a peer offer is created and sent to the entered user.
 */
export const useEnters = () => {
  const ablyClient = useContext(AblyClientContext)!
  const myUserID = useContext(UserIDContext)
  const roomID = useContext(RoomIDContext)

  useEffectOnce(() => {
    const roomChannel = ablyClient.channels.get(`room:${roomID}`)

    subscribeAblyPresence(roomChannel, 'enter', (msg: Message) => {
      const userID = msg.clientId!
      if (userID === myUserID) return null

      positiveLog(`USER ${userID} ENTERED >`)
    })
  })
}
