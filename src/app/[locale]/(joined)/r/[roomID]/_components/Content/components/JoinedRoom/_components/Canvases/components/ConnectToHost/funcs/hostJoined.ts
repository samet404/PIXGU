import { useHostPeer, useIsGameStopped, usePing } from '@/zustand/store'
import { positiveLog } from '@/utils'
import { createHostPeer } from './createHostPeer'

/**
 * This function handles the event when the host joins the room.
 */
export const hostJoined = (roomID: string, myUserID: string) => {
  positiveLog('HOST JOINED')

  useHostPeer.getState().set({ status: 'connecting' })
  createHostPeer(roomID, myUserID)
  useIsGameStopped.getState().addCode('connectingToHost')
  usePing.getState().reset()
}
