'use client'

import type { PropsWithChildren } from 'react'
import { Part1 } from './components/Part1'
import { Part2 } from './components/Part2'

const Providers = ({
  roomID,
  userID,
  hostID,
  isHostPlayer,
  children,
}: Props) => {
  console.log(`Providers: ${userID}`)
  return (
    <Part1 roomID={roomID}>
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
} & PropsWithChildren
