import { useEffectOnce } from '@/hooks/useEffectOnce'
import { negativeLog } from '@/utils'
import { useRoomIDStore } from '@/zustand/provider'
import { usePeers } from '@/zustand/store/usePeers'

/**
 * This hook unsubscribes from the room channel and the user's connect channel.
 * It also destroys all peer connections.
 */
export const useMyLeave = () => {
  const peers = usePeers((state) => state.peers)
  const roomID = useRoomIDStore((state) => state.roomID)

  useEffectOnce(() => () => {
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

    negativeLog(`YOU LEFT THE ROOM ${roomID} <`)
  })
}
