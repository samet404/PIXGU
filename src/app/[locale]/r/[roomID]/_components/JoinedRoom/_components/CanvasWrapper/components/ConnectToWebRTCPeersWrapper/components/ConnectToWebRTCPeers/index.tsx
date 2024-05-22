'use client'

import dynamic from 'next/dynamic'
import { useHandlePeers } from './hooks/useHandlePeers'
import type { User } from 'lucia'

const Canvases = dynamic(() => import('./components/Canvases'))
const ErrDisplay = dynamic(() => import('@/components/ErrDisplay'))

const ConnectToWebRTCPeers = ({ user, roomID }: Props) => {
  const { peersRef, isSuccess } = useHandlePeers(user, roomID)

  if (isSuccess) return <Canvases peersRef={peersRef} />

  return <div className="pt-7">{'Connecting to them WebRTC peers...'}</div>
}

export default ConnectToWebRTCPeers

type Props = {
  user: User
  roomID: string
}
