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
      for (const userID of Object.keys(peers)) {
        try {
          if (!peers[userID])
            negativeLog(`PEER OBJECT TO ${userID} NOT FOUND WHEN LEFT <`)
          else if (!peers[userID].peer)
            negativeLog(`PEER CONNECTION TO ${userID} NOT FOUND WHEN LEFT <`)
          else if (peers[userID].peer) {
            peers[userID].peer.destroy()
            delete peers[userID]
            negativeLog(`PEER CONNECTION TO ${userID} DESTROYED WHEN LEFT <`)
          }
        } catch (e) {
          negativeLog(`ERROR DESTROYING PEER CONNECTION TO ${userID}`)
        }
      }

      ablyClient.close()
      negativeLog(`YOU LEFT THE ROOM ${roomID} <`)
    }
  })
}
