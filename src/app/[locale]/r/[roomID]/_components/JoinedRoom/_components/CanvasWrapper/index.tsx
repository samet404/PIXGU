import ConnectToSocket from './components/ConnectToSocket'
import ConnectToWebRTCPeersWrapper from './components/ConnectToWebRTCPeersWrapper'

const CanvasesWrapper = () => {
  return (
    <ConnectToSocket>
      <ConnectToWebRTCPeersWrapper />
    </ConnectToSocket>
  )
}

export default CanvasesWrapper
