'use client'

import dynamic from 'next/dynamic'
import { useConnectPeers } from './hooks/useConnectPeers'
import type { User } from 'lucia'

const Canvases = dynamic(() => import('./components/Canvases'))
const ErrDisplay = dynamic(() => import('@/components/ErrDisplay'))

const ConnectToWebRTCPeers = ({ user, roomID }: Props) => {
  const { peersRef, err, isSuccess } = useConnectPeers(user, roomID)

  if (isSuccess) return <Canvases peersRef={peersRef} />
  if (err) {
    return (
      <ErrDisplay
        msg={err.name}
        reason={err.message}
        code={500}
        redirectTo="/"
      />
    )
  }
  return <div className="pt-7">{'Connecting to them WebRTC peers...'}</div>
}

export default ConnectToWebRTCPeers

type Props = {
  user: User
  roomID: string
}
