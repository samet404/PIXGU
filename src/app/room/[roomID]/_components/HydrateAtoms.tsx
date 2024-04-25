'use client'

import { useHydrateAtoms } from 'jotai/utils'
import { roomIDAtom } from '../atoms'
import { type ReactNode } from 'react'

const HydrateAtoms = ({ roomID, children }: Props) => {
  useHydrateAtoms([[roomIDAtom, roomID]])

  return children
}

export default HydrateAtoms

type Props = {
  roomID: string
  children: ReactNode
}
