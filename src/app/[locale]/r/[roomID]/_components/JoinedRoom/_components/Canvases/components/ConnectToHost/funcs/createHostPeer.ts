import type { WebRTCSignalData } from '@/types'
import { goldLog } from '@/utils/goldLog'
import { positiveLog } from '@/utils/positiveLog'
import { simplePeer } from '@/utils/simplePeer'
import {
  useHostPeer,
  useIsGameStopped,
  usePlayers,
  useSocketIO,
} from '@/zustand/store'
import { handlePeerDatas } from './handlePeerDatas'
import { postMsgToPlayerTimerWorker } from '@/workers'

export const createHostPeer = (roomID: string, myUserID: string) => {
  const io = useSocketIO.getState().io
  const setHostPeer = useHostPeer.getState().set

  const peer = simplePeer()

  setHostPeer({
    peer,
  })

  useHostPeer
    .getState()
    .peer!.on('signal', (signalData: WebRTCSignalData) => {
      goldLog(`${signalData.type.toUpperCase()} SENT TO HOST`)
      io!.emit('send-webrtc-signal', signalData)
    })

  useHostPeer.getState().peer!.on('error', (err) => {
    // @ts-expect-error
    console.error(err.code, err)
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

    postMsgToPlayerTimerWorker({
      ID: 'RTT',
      event: 'start',
      type: 'interval',
      triggerNow: true,
      ms: 5000,
    })

    handlePeerDatas(myUserID)
  })
}
