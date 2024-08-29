'use client'

import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useRoomIDStore, useUserIDStore } from '@/zustand/provider'
import { useSoketiClient } from '@/context/client/react'
import { memberAdded } from './funcs'
import { toPusherKey } from '@/utils/toPusherKey'
import type { User } from 'lucia'
import { useHostingHealth } from '@/zustand/store'
import { playerLeaved } from './funcs/playerLeaved'

export const ConnectToPeers = () => {
  const setHostingHealth = useHostingHealth.getState().set
  const roomID = useRoomIDStore((state) => state.roomID)
  const myUserID = useUserIDStore((state) => state.userID)
  const soketiClient = useSoketiClient()

  useEffectOnce(() => {
    const myConnectPresenceChannel = soketiClient.subscribe(
      toPusherKey(`presence-private-room-${roomID}:connect_to_host`),
    )

    myConnectPresenceChannel.bind(
      'pusher:member_added',
      (member: { id: string; info: User }) =>
        memberAdded(member, myUserID, roomID, soketiClient),
    )

    myConnectPresenceChannel.bind(
      'pusher:member_removed',
      (member: { id: string; info: User }) => {
        playerLeaved(soketiClient, member.id, roomID)
      },
    )
  })

  useEffectOnce(() => {
    setHostingHealth('waitingForPlayers')
  })

  return null
}
