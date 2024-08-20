import type { WebRTC_signalDataToHost } from '@/types/pusher'
import { goldLog } from '@/utils/goldLog'
import { usePeers } from '@/zustand/store'

export const signalData = (data: WebRTC_signalDataToHost) => {
  const { signalData, userID } = data
  console.log(data)
  const peers = usePeers.getState().get()

  goldLog(
    `${signalData.type.toUpperCase()} RECEIVED FROM ${userID}`,
    signalData,
  )

  if (!peers[userID]) {
    import('@/utils').then((m) =>
      m.negativeLog(`Peer not found when signaling to ${userID}`),
    )
    return
  }

  peers[userID]!.peer.signal(signalData)
}
