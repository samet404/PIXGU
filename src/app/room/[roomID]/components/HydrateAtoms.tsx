'use client'

import { useHydrateAtoms } from 'jotai/utils'
import { type ReactNode } from 'react'
import { roomIDAtom, userIDAtom, playersAtom } from '../atoms'
import { type RouterOutputs } from '@/trpc/shared'

type HydrateAtomsProps = {
  roomID: string
  userID: string
  players: RouterOutputs['gameRoom']['getPlayingRoomUsers']
  children: ReactNode
}

const HydrateAtoms = ({
  roomID,
  userID,
  players,
  children,
}: HydrateAtomsProps) => {
  useHydrateAtoms([
    [roomIDAtom, roomID],
    [userIDAtom, userID],
    [playersAtom, players],
  ])

  return children
}

export default HydrateAtoms
