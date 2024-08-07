import { AblyClientContext, RoomIDContext } from '@/context/client'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { negativeLog } from '@/utils'
import { useRoomPlayersIDsStore } from '@/zustand/store/useRoomPlayersIDsStore'
import { useContext } from 'react'

/**
 * This hook destroys everyting about the user's connection to the room.
 */
export const useMyLeave = () => {
  const ablyClient = useContext(AblyClientContext)!
  const roomID = useContext(RoomIDContext)
  const resetRoomPlayersIDsState = useRoomPlayersIDsStore((s) => s.reset)

  useEffectOnce(() => () => {
    resetRoomPlayersIDsState()
    ablyClient.close()

    negativeLog(`YOU LEFT THE ROOM ${roomID} <`)
  })
}
