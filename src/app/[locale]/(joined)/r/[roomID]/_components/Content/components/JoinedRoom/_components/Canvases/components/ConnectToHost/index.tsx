'use client'

import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useRoomIDStore, useUserIDStore } from '@/zustand/provider'
import { hostLeft, receiveSignal } from './funcs'
import { hostJoined } from './funcs/hostJoined'
import { useSocketIO } from '@/zustand/store'

export const ConnectToHost = () => {
  const roomID = useRoomIDStore((state) => state.roomID)
  const myUserID = useUserIDStore((state) => state.userID)

  useEffectOnce(() => {
    receiveSignal()
    hostJoined(roomID, myUserID)
    hostLeft()
    useSocketIO.getState().io?.emit('ready')
  })

  return null
}
