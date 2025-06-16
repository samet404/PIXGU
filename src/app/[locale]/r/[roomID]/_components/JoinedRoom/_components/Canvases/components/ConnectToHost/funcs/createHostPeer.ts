import { goldLog } from '@/utils/goldLog'
import type { WebRTCSignalData } from '@/types'
import { positiveLog } from '@/utils'
import { handlePeerDatas } from './handlePeerDatas'
import { postMsgToPlayerTimerWorker } from '@/workers'
import { usePlayers } from '@/zustand/store/usePlayers'
import { useHostPeer } from '@/zustand/store/useHostPeer'
import { useIsGameStopped } from '@/zustand/store/useIsGameStopped'
import { useSocketIO } from '@/zustand/store/useSocketIO'
import PixguPeer from 'src/pixgu-peer/pixguPeer'

export const createHostPeer = (roomID: string, myUserID: string) => {
  const io = useSocketIO.getState().io
  const setHostPeer = useHostPeer.getState().set

  const peer = new PixguPeer({
    initiator: false,
    channelConfig: {
      ordered: true,
    },
    objectMode: true,
  })

  setHostPeer({
    peer,
  })

  useHostPeer.getState().peer!.on('signal', (signalData: WebRTCSignalData) => {
    goldLog(`${signalData.type.toUpperCase()} SENT TO HOST`)
    io!.emit('send-webrtc-signal', signalData)
  })

  useHostPeer.getState().peer!.on('error', (err: any) => {
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
