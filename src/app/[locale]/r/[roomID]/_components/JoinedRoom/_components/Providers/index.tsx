'use client'

import type { PropsWithChildren } from 'react'
import { Part1 } from './components/Part1'
import { Part2 } from './components/Part2'
import type { User } from 'lucia'

const Providers = ({
  roomID,
  userID,
  hostID,
  isHostPlayer,
  myUserInfo,
  children,
}: Props) => {
  return (
    <Part1 roomID={roomID} myUserInfo={myUserInfo}>
      <Part2
        roomID={roomID}
        userID={userID}
        hostID={hostID}
        isHostPlayer={isHostPlayer}
      >
        {children}
      </Part2>
    </Part1>
  )
}

export default Providers

type Props = {
  roomID: string
  userID: string
  hostID: string
  isHostPlayer: boolean
  myUserInfo: User
} & PropsWithChildren
