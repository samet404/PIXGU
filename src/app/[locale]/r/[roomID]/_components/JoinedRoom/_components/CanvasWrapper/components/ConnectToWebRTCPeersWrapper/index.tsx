import { getRoomID, getUser } from '@/context/server'
import ConnectToWebRTCPeers from './components/ConnectToWebRTCPeers'

const ConnectToWebRTCPeersWrapper = () => {
  const user = getUser()!
  const roomID = getRoomID()!

  return <ConnectToWebRTCPeers user={user} roomID={roomID} />
}

export default ConnectToWebRTCPeersWrapper
