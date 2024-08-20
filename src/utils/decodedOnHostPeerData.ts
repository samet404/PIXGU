import { useHostPeer } from '@/zustand/store/useHostPeer'
import type { WebRTCConnData } from '@/types/webRTCConnData'

export const decodedOnHostPeerData = (
  callback: (decodedData: WebRTCConnData) => void,
) => {
  const hostPeer = useHostPeer.getState().get()

  if (!hostPeer) {
    import('@/utils/negativeLog').then(({ negativeLog }) =>
      negativeLog('hostPeer not found when decoding on host peer data'),
    )
    return
  }

  import('@/utils').then((m) => m.decodedOnPeerData(hostPeer, callback))
}
