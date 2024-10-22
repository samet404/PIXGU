import { api } from '@/trpc/client'
import type { WebRTCSignalData } from '@/types/webRTCSignalData'
import { goldLog } from '@/utils/goldLog'
import { pingHostPeer } from '@/utils/pingHostPeer'
import { positiveLog } from '@/utils/positiveLog'
import { simplePeer } from '@/utils/simplePeer'
import {
  useHostPeer,
  useIsGameStopped,
  usePlayers,
  useSocketIO,
} from '@/zustand/store'
import { handlePeerDatas } from './handlePeerDatas'

export const createHostPeer = (roomID: string, myUserID: string) => {
  const io = useSocketIO.getState().io
  const setHostPeer = useHostPeer.getState().set

  setHostPeer({
    peer: simplePeer(),
  })

  useHostPeer
    .getState()
    .peer!.on('signal', async (signalData: WebRTCSignalData) => {
      goldLog(`${signalData.type.toUpperCase()} SENT TO HOST`)
      io!.emit('send-webrtc-signal', signalData)
    })

  useHostPeer.getState().peer!.on('error', (err) => {
    console.error(err)
    usePlayers.getState().reset()

    setHostPeer({
      status: 'failed',
    })
  })

  useHostPeer.getState().peer!.on('connect', () => {
    positiveLog(`CONNECTED TO HOST`)

    useIsGameStopped.getState().removeCode('connectingToHost')
    setHostPeer({
      status: 'connected',
    })

    pingHostPeer(5000)
    handlePeerDatas(myUserID)
  })
}
