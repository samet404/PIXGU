'use client'

import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useRoomIDStore, useUserIDStore } from '@/zustand/provider'
import { useSoketiClient } from '@/context/client/react'
import { memberAdded } from './funcs'
import { toPusherKey } from '@/utils/toPusherKey'
import type { User } from 'lucia'
import { useHostingHealth } from '@/zustand/store'
import { grayLog } from '@/utils/grayLog'
import { positiveLog } from '@/utils/positiveLog'
import { negativeLog } from '@/utils/negativeLog'
import { violetLog } from '@/utils/violetLog'
import { createPeer } from './funcs/createPeer'
import { subscribePusher } from '@/utils/subscribePusher'

export const ConnectToPeers = () => {
  const setHostingHealth = useHostingHealth.getState().set
  const roomID = useRoomIDStore((state) => state.roomID)
  const myUserID = useUserIDStore((state) => state.userID)
  const soketiClient = useSoketiClient()

  useEffectOnce(() => {
    const myConnectPresenceChannel = subscribePusher(
      soketiClient,
      `presence-private-room-${roomID}:connect_to_host`,
    )

    myConnectPresenceChannel.bind(
      'pusher:subscription_succeeded',
      ({
        members,
      }: {
        count: number
        me: { id: 'slw1594m2jwzk7rf5ia6nwi0'; info: Omit<User, 'id'> }
        members: Record<string, Omit<User, 'id'>>
        myID: string
      }) => {
        setHostingHealth('waitingForPlayers')
        positiveLog('SUBSCRIBED TO SOKETI CHANNEL (WS)')
        Object.keys(members).forEach((ID) => {
          if (ID.endsWith('-HOST')) return
          createPeer(
            soketiClient,
            roomID,
            ID,
            {
              id: ID,
              info: members[ID]!,
            },
            myUserID,
          )
        })
      },
    )

    myConnectPresenceChannel.bind('pusher:subscription_error', (e: any) => {
      console.log(e)
      setHostingHealth('wsError')
    })

    soketiClient.connection.bind('connected', () => {
      positiveLog('CONNECTED TO SOKETI (WS)')
    })

    soketiClient.connection.bind('disconnected', () => {
      setHostingHealth('wsError')
      negativeLog('DISCONNECTED FROM SOKETI (WS)')
    })

    soketiClient.connection.bind('failed', () => {
      negativeLog('FAILED TO CONNECT TO SOKETI (WS)')
      setHostingHealth('wsError')
    })

    soketiClient.connection.bind('pusher:subscription_succeeded', () => {
      positiveLog('SUBSCRIBED TO SOKETI (WS)')
    })

    soketiClient.connection.bind('pusher:error', (err: any) => {
      negativeLog('PUSHER ERROR', err)
    })

    soketiClient.connection.bind('pusher:ping', (latency: any) => {
      violetLog('PUSHER PING', latency)
    })

    myConnectPresenceChannel.bind(
      'pusher:member_added',
      (member: { id: string; info: Omit<User, 'id'> }) =>
        memberAdded(member, myUserID, roomID, soketiClient),
    )

    soketiClient.connection.bind(
      'state_change',
      (state: { previous: string; current: string }) => {
        console.log('Connection state changed:', state)

        if (
          state.current === 'disconnected' ||
          state.current === 'failed' ||
          state.current === 'unavailable'
        ) {
          setHostingHealth('wsError')
          negativeLog('PUSHER STATE CHANGED', state)
          return
        }

        violetLog('PUSHER STATE CHANGED', state)
      },
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
