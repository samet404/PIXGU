import type { Message } from 'ably'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { subscribeAblyPresence } from '@/utils/subscribeAblyPresence'
import { useContext } from 'react'
import { negativeLog } from '@/utils'
import { RoomPlayersIDsContext } from '@/context/client/react/roomPlayersIDsContext'
import { useRoomPlayersIDsStore } from '@/zustand/store/useRoomPlayersIDsStore'
import {
  AblyClientContext,
  PeersContext,
  RoomIDContext,
  UserIDContext,
} from '@/context/client'

/**
 * This hook handles everything about leaving room.
 * Subscribes to the 'leaves' presence event on the room channel and updates current players states.
 * When a other user leaves the room, the peer connection is destroyed. And everything related to that user is removed.
 */
export const useLeaves = () => {
  const ablyClient = useContext(AblyClientContext)!
  const roomID = useContext(RoomIDContext)
  const peers = useContext(PeersContext)
  const myUserID = useContext(UserIDContext)

  const playersIDsContext = useContext(RoomPlayersIDsContext)
  const updatePlayerIDState = useRoomPlayersIDsStore((s) => s.update)

  useEffectOnce(() => {
    const roomChannel = ablyClient.channels.get(`room:${roomID}`)

    subscribeAblyPresence(roomChannel, 'leave', async (msg: Message) => {
      const userID = msg.clientId!
      negativeLog(`USER ${userID} LEFT <`)

      // #region update playersIDs
      const presenceSet = await roomChannel.presence.get()
      const newPlayersIDs = presenceSet
        .filter((p) => p.clientId !== myUserID)
        .map((p) => p.clientId)

      console.log(newPlayersIDs)

      playersIDsContext.value = newPlayersIDs
      updatePlayerIDState(newPlayersIDs)
      // #endregion

      if (!peers[userID])
        negativeLog(`PEER OBJECT TO ${userID} NOT FOUND WHEN USER LEFT <`)
      else if (!peers[userID].peer) {
        negativeLog(`PEER CONNECTION TO ${userID} NOT FOUND WHEN USER LEFT <`)
      } else if (peers[userID] && peers[userID].peer) {
        peers[userID]!.peer!.destroy()
        delete peers[userID]
        negativeLog(`PEER CONNECTION TO ${userID} DESTROYED WHEN USER LEFT <`)
      }
    })
  })
}
