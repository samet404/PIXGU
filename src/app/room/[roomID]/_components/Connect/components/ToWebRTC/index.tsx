'use client'

import { useMyAtomPeer } from '@/hooks/useMyAtomPeer'
import { myPeerAtom } from '@/app/room/[roomID]/atoms'
import { type ReactNode } from 'react'
import dynamic from 'next/dynamic'

const ErrDisplay = dynamic(() => import('@/components/ErrDisplay'))

const ToWebRTC = ({ children }: Props) => {
  const { err, isErr, isSuccess } = useMyAtomPeer(myPeerAtom, { secure: false })

  if (isSuccess) return children
  if (isErr)
    return (
      <ErrDisplay
        msg="Failed to create WebRTC peer"
        reason={err ?? 'REASON NOT SPECIFIED'}
      />
    )
  return <div className="pt-7">{'Creating WebRTC peer...'}</div>
}

export default ToWebRTC

type Props = {
  children: ReactNode
}
