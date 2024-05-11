'use client'

import { type ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { useConnectPeers } from './hooks/useConnectPeers'

const Canvases = dynamic(() => import('./components/Canvases'))
const ErrDisplay = dynamic(() => import('@/components/ErrDisplay'))

const ConnectToWebRTCPeers = () => {
  const { peersRef, err, isSuccess } = useConnectPeers()

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
