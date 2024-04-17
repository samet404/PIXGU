'use client'

import { useHydrateAtoms } from 'jotai/utils'
import { type ReactNode } from 'react'
import { roomIDAtom, userIDAtom } from '../../../atoms'

const HydrateAtoms = ({
  roomID,
  userID,
  children,
}: {
  roomID: string
  userID: string
  children: ReactNode
}) => {
  useHydrateAtoms([
    [roomIDAtom, roomID],
    [userIDAtom, userID],
  ])

  return children
}
export default HydrateAtoms
