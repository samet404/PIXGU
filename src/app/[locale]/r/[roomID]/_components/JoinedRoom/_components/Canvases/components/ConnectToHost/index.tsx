'use client'

import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useRoomIDStore, useUserIDStore } from '@/zustand/provider'
import { getSecretKey, hostLeft, receiveSignal } from './funcs'
import { useSocketIO } from '@/zustand/store'

export const ConnectToHost = () => {
  const roomID = useRoomIDStore((state) => state.roomID)
  const myUserID = useUserIDStore((state) => state.userID)

  console.log('myUserID: ', myUserID)
  useEffectOnce(() => {
    receiveSignal(roomID, myUserID)
    getSecretKey()
    hostLeft()
    useSocketIO.getState().io?.emit('ready')
  })

  return null
}
