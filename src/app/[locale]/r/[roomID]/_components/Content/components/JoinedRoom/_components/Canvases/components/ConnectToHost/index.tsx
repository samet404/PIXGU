'use client'

import type { WebRTCSignalData } from '@/types/webRTCSignalData'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useHostPeer } from '@/zustand/store/useHostPeer'
import { useSoketiClient } from '@/context/client/react'
import { toPusherKey } from '@/utils/toPusherKey'
import { useRoomIDStore, useUserIDStore } from '@/zustand/provider'
import { signalData } from './funcs/signalData'
import { positiveLog } from '@/utils/positiveLog'
import { pingHostPeer } from '@/utils/pingHostPeer'
import { handlePeerDatas } from './funcs'
import { goldLog } from '@/utils/goldLog'
import { api } from '@/trpc/client'
import { simplePeer } from '@/utils/simplePeer'
import { useIsGameStopped } from '@/zustand/store/useIsGameStopped'

export const ConnectToHost = () => {
  const soketiClient = useSoketiClient()
  const roomID = useRoomIDStore((state) => state.roomID)
  const myUserID = useUserIDStore((state) => state.userID)
  const setHostPeer = useHostPeer.getState().set
  const setIsGameStopped = useIsGameStopped.getState().stop

  useEffectOnce(() => {
    console.log(roomID, myUserID)

    setHostPeer({
      peer: simplePeer(),
    })

    const peer = useHostPeer.getState().get()!

    const myConnectChannel = soketiClient.subscribe(
      toPusherKey(`private-room-${roomID}:connect_to_player:${myUserID}`),
    )

    myConnectChannel.bind('pusher:subscription_succeeded', (data: any) => {
      console.log('subscription_succeeded', data)
    })

    myConnectChannel.bind('pusher:subscription_error', (data: any) => {
      console.log('subscription_error', data)
    })

    myConnectChannel.bind('webRTC_signalData', (data: WebRTCSignalData) =>
      signalData(data),
    )

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
      setIsGameStopped('waitingForPlayers')

      setHostPeer({
        status: 'connected',
      })

      pingHostPeer(5000)
      handlePeerDatas(myUserID)
    })

    const presenceChannel = soketiClient.subscribe(
      toPusherKey(`presence-private-room-${roomID}:connect_to_host`),
    )

    presenceChannel.bind('pusher:subscription_succeeded', (data: any) => {
      console.log('subscription_succeeded for presence', data)
    })

    presenceChannel.bind('pusher:subscription_error', (data: any) => {
      console.log('subscription_error for presence', data)
    })
  })

  return null
}
