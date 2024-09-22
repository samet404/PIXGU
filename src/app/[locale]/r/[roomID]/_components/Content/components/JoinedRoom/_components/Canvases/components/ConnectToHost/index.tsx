'use client'

import type { WebRTCSignalData } from '@/types/webRTCSignalData'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useSoketiClient } from '@/context/client/react'
import { useRoomIDStore, useUserIDStore } from '@/zustand/provider'
import { signalData } from './funcs/signalData'
import type { User } from 'lucia'
import { subscribePusher } from '@/utils/subscribePusher'
import { useHostPeer, useIsGameStopped, usePing } from '@/zustand/store'
import { positiveLog } from '@/utils/positiveLog'
import { createHostPeer } from './funcs/createHostPeer'

export const ConnectToHost = () => {
  const soketiClient = useSoketiClient()
  const roomID = useRoomIDStore((state) => state.roomID)
  const myUserID = useUserIDStore((state) => state.userID)

  useEffectOnce(() => {
    createHostPeer(roomID, myUserID)
    const myConnectChannel = subscribePusher(
      soketiClient,
      `private-room-${roomID}:connect_to_player:${myUserID}`,
    )

    myConnectChannel.bind('pusher:subscription_succeeded', () => {
      positiveLog(
        `SUBSCRIBED TO "private-room-${roomID}:connect_to_player:${myUserID}" CHANNEL (WS)`,
      )
    })

    myConnectChannel.bind('pusher:subscription_error', (data: any) => {
      console.log('subscription_error', data)
    })

    myConnectChannel.bind('webRTC_signalData', (data: WebRTCSignalData) =>
      signalData(data),
    )

    const presenceChannel = subscribePusher(
      soketiClient,
      `presence-private-room-${roomID}:connect_to_host`,
    )

    presenceChannel.bind(
      'pusher:subscription_succeeded',
      (data: {
        count: number
        me: { id: 'slw1594m2jwzk7rf5ia6nwi0'; info: Omit<User, 'id'> }
        members: Record<string, Omit<User, 'id'>>
        myID: string
      }) => {
        positiveLog(
          `SUBSCRIBED TO "presence-private-room-${roomID}:connect_to_host" CHANNEL (WS)`,
          data,
        )

        const isHostInRoom = Object.keys(data.members).some((ID) =>
          ID.endsWith('-HOST'),
        )

        if (isHostInRoom) useHostPeer.getState().set({ status: 'connecting' })
      },
    )

    presenceChannel.bind(
      'pusher:member_added',
      (member: { id: string; info: Omit<User, 'id'> }) => {
        const isHostInRoom = member.id.endsWith('-HOST')

        if (isHostInRoom) useHostPeer.getState().set({ status: 'connecting' })
      },
    )

    presenceChannel.bind(
      'pusher:member_removed',
      (member: { id: string; info: Omit<User, 'id'> }) => {
        const isHost = member.id.endsWith('-HOST')

        if (isHost) {
          useHostPeer.getState().reset()
          createHostPeer(roomID, myUserID)
          useIsGameStopped.getState().addCode('connectingToHost')
          usePing.getState().reset()
        }
      },
    )

    presenceChannel.bind('pusher:subscription_error', (data: any) => {
      console.log('subscription_error for presence', data)
    })
  })

  return null
}
