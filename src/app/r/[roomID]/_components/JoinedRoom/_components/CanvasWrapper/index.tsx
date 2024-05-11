import { type ReactNode } from 'react'
import ConnectToWebRTCPeers from './components/ConnectToWebRTCPeers'
import ConnectToSocket from './components/ConnectToSocket'

const CanvasesWrapper = () => {
  return <ConnectToSocket></ConnectToSocket>
}

export default CanvasesWrapper

type Props = {
  children: ReactNode
}
