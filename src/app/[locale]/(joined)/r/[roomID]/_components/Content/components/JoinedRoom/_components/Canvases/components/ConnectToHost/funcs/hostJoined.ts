import {
  useHostPeer,
  useIsGameStopped,
  usePing,
  useSocketIO,
} from '@/zustand/store'
import type { Guest } from '@/types'
import { positiveLog } from '@/utils'
import type { User } from 'lucia'
import { createHostPeer } from './createHostPeer'

/**
 * This function handles the event when the host joins the room.
 */
export const hostJoined = (roomID: string, myUserID: string) =>
  useSocketIO.getState().io!.on('host-joined', (host: Guest | User) => {
    positiveLog('HOST JOINED', host)

    useHostPeer.getState().set({ status: 'connecting' })
    createHostPeer(roomID, myUserID)
    useIsGameStopped.getState().addCode('connectingToHost')
    usePing.getState().reset()
  })
