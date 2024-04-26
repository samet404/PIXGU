'use client'

import { useMyAtomPeer } from '@/hooks/useMyAtomPeer'
import { myPeerAtom } from '@/app/room/[roomID]/atoms'
import { useState, type ReactNode } from 'react'

const ToWebRTC = ({ children }: Props) => {
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null)
  useMyAtomPeer(myPeerAtom, { secure: false }, () => setIsSuccess(true))

  if (isSuccess == null) return 'Creating WebRTC peer...'
  return isSuccess == true ? children : 'Failed to create WebRTC peer'
}

export default ToWebRTC

type Props = {
  children: ReactNode
}
