'use client'

import { useHydrateAtoms } from 'jotai/utils'
import { type ReactNode } from 'react'
import { roomIDAtom } from '../atoms'

type HydrateAtomsProps = {
  roomID: string
  children: ReactNode
}

const HydrateAtoms = ({ roomID, children }: HydrateAtomsProps) => {
  useHydrateAtoms([[roomIDAtom, roomID]])

  return children
}

export default HydrateAtoms
