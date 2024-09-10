'use client'

import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useRoomIDStore, useUserIDStore } from '@/zustand/provider'
import { useSoketiClient } from '@/context/client/react'
import { memberAdded } from './funcs'
import { toPusherKey } from '@/utils/toPusherKey'
import type { User } from 'lucia'
import { useHostingHealth } from '@/zustand/store'
import { grayLog } from '@/utils/grayLog'

export const ConnectToPeers = () => {
  const setHostingHealth = useHostingHealth.getState().set
  const roomID = useRoomIDStore((state) => state.roomID)
  const myUserID = useUserIDStore((state) => state.userID)
  const soketiClient = useSoketiClient()

  useEffectOnce(() => {
    const myConnectPresenceChannel = soketiClient.subscribe(
      toPusherKey(`presence-private-room-${roomID}:connect_to_host`),
    )

    myConnectPresenceChannel.bind('pusher:subscription_succeeded', () => {
      setHostingHealth('waitingForPlayers')
    })

    myConnectPresenceChannel.bind('pusher:subscription_error', (e) => {
      console.log(e)
      setHostingHealth('networkError')
    })

    myConnectPresenceChannel.bind(
      'pusher:member_added',
      (member: { id: string; info: Omit<User, 'id'> }) =>
        memberAdded(member, myUserID, roomID, soketiClient),
    )

    myConnectPresenceChannel.bind(
      'pusher:member_removed',
      (member: { id: string; info: Omit<User, 'id'> }) => {
        grayLog('MEMBER REMOVED FROM SOKETI CHANNEL', member)
        // playerLeaved(soketiClient, member.id, roomID)
      },
    )
  })

  return null
}
