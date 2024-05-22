import ConnectToWebRTCPeersWrapper from './components/ConnectToWebRTCPeersWrapper'
import dynamic from 'next/dynamic'

const ConnectToSocket = dynamic(() => import('./components/ConnectToSocket'), {
  ssr: false,
})

const CanvasesWrapper = () => {
  return (
    <ConnectToSocket>
      <ConnectToWebRTCPeersWrapper />
    </ConnectToSocket>
  )
}

export default CanvasesWrapper
