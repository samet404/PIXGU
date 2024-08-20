'use client'

import type { WebRTC_signalDataToHost } from '@/types/pusher'
import { useSetAtom } from 'jotai'
import { hostingHealth } from '../../atoms'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useRoomIDStore, useUserIDStore } from '@/zustand/provider'
import { useSoketiClient } from '@/context/client/react'
import { signalData, memberAdded } from './funcs'
import { toPusherKey } from '@/utils/toPusherKey'
import type { User } from 'lucia'

const ConnectToPeers = () => {
  const setHostingHealth = useSetAtom(hostingHealth)
  const roomID = useRoomIDStore((state) => state.roomID)
  const myUserID = useUserIDStore((state) => state.userID)
  const soketiClient = useSoketiClient()

  useEffectOnce(() => {
    const myConnectChannel = soketiClient.subscribe(
      toPusherKey(`private-room-${roomID}:connect_to_host`),
    )

    myConnectChannel.bind('pusher:subscription_succeeded', (data: any) => {
      console.log('subscription_succeeded', data)
    })

    myConnectChannel.bind('pusher:subscription_error', (data: any) => {
      console.log('subscription_error', data)
    })

    const myConnectPresenceChannel = soketiClient.subscribe(
      toPusherKey(`presence-private-room-${roomID}:connect_to_host`),
    )

    myConnectChannel.bind('webRTC_signal', (data: WebRTC_signalDataToHost) =>
      signalData(data),
    )

    myConnectPresenceChannel.bind(
      'pusher:member_added',
      (member: { id: string; info: User }) =>
        memberAdded(member, myUserID, roomID),
    )

    return () => {
      myConnectChannel.unbind_all()
      myConnectChannel.unsubscribe()
    }
  })

  useEffectOnce(() => {
    setHostingHealth({
      isErr: false,
      isLoading: false,
      isSuccess: true,
      msg: 'Everything is ready, hosting room now',
    })
  })

  return null
}

export default ConnectToPeers
