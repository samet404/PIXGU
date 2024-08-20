import type { WebRTCSignalData } from '@/types/webRTCSignalData'
import { goldLog } from '@/utils/goldLog'
import { useHostPeer } from '@/zustand/store/useHostPeer'

export const signalData = (signalData: WebRTCSignalData) => {
  const peer = useHostPeer.getState().get()!
  goldLog(`SIGNAL RECEIVED FROM HOST`, signalData)

  peer.signal(signalData)
}
