'use client'

import { setRoomID } from '@/context/client/room'
import { type PropsWithChildren } from 'react'

export const Client = ({
  roomID,
  children,
}: { roomID: string } & PropsWithChildren) => {
  return children
}
