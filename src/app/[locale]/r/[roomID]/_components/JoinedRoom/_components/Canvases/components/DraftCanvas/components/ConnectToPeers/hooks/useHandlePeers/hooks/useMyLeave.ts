import {
  AblyClientContext,
  PeersContext,
  RoomIDContext,
} from '@/context/client'
import { RoomPlayersIDsContext } from '@/context/client/react/roomPlayersIDsContext'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { negativeLog } from '@/utils'
import { useRoomPlayersIDsStore } from '@/zustand/store/useRoomPlayersIDsStore'
import { useContext } from 'react'

/**
 * This hook unsubscribes from the room channel and the user's connect channel.
 * It also destroys all peer connections.
 */
export const useMyLeave = () => {
  const ablyClient = useContext(AblyClientContext)!
  const peers = useContext(PeersContext)
  const roomID = useContext(RoomIDContext)
  const roomPlayersIDs = useContext(RoomPlayersIDsContext)
  const resetRoomPlayersIDsState = useRoomPlayersIDsStore((s) => s.reset)

  useEffectOnce(() => {
    return () => {
      for (const userID of Object.keys(peers)) {
        try {
          if (!peers[userID])
            negativeLog(`PEER OBJECT TO ${userID} NOT FOUND WHEN LEFT <`)
          else if (!peers[userID].peer)
            negativeLog(`PEER CONNECTION TO ${userID} NOT FOUND WHEN LEFT <`)
          else if (peers[userID] && peers[userID].peer) {
            peers[userID]!.peer!.destroy()
            delete peers[userID]
            negativeLog(`PEER CONNECTION TO ${userID} DESTROYED WHEN LEFT <`)
          } else throw new Error('Peer connection not found')
        } catch (e) {
          negativeLog(`ERROR DESTROYING PEER CONNECTION TO ${userID}`)
        }
      }

      roomPlayersIDs.value = []
      resetRoomPlayersIDsState()

      ablyClient.channels.get(`room:${roomID}:*`).unsubscribe()
      ablyClient.channels.get(`server:room:${roomID}:*`).unsubscribe()
      ablyClient?.close()

      negativeLog(`YOU LEFT THE ROOM < ${roomID}`)
    }
  })
}
