import { api } from '@/trpc/client'
import type { WebRTCSignalData } from '@/types/webRTCSignalData'
import { goldLog } from '@/utils/goldLog'
import { pingHostPeer } from '@/utils/pingHostPeer'
import { positiveLog } from '@/utils/positiveLog'
import { simplePeer } from '@/utils/simplePeer'
import { useHostPeer } from '@/zustand/store'
import { handlePeerDatas } from './handlePeerDatas'

export const createHostPeer = (roomID: string, myUserID: string) => {
  const setHostPeer = useHostPeer.getState().set
  const peer = simplePeer()

  setHostPeer({
    peer,
  })

  peer.on('signal', async (signalData: WebRTCSignalData) => {
    goldLog(`${signalData.type.toUpperCase()} SENT TO HOST`)
    await api.gameRoom.sendSignalDataToHost.mutate({
      roomID,
      signalData,
    })
  })

  peer.on('error', (err) => {
    console.error(err)

    setHostPeer({
      status: 'failed',
    })
  })

  peer.on('connect', () => {
    positiveLog(`CONNECTED TO HOST`)

    setHostPeer({
      status: 'connected',
    })

    pingHostPeer(5000)
    handlePeerDatas(myUserID)
  })
}
