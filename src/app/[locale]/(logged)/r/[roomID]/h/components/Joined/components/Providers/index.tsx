'use client'

import type { PropsWithChildren } from 'react'

import {
  HostInfoStoreProvider,
  UserIDStoreProvider,
  RoomIDStoreProvider,
  MyUserInfoForRoomStoreProvider,
} from '@/zustand/provider'
import { type MyUserInfoForRoomStoreState } from '@/zustand/store'
import dynamic from 'next/dynamic'
import { SocketIO } from './components/SocketIO'

export const Providers = ({
  roomID,
  userID,
  hostID,
  user,
  children,
}: Props) => {
  return (
    <SocketIO roomID={roomID}>
      <HostInfoStoreProvider
        initState={{
          amIHost: userID === hostID,
          hostID,
          isPlayer: true,
        }}
      >
        <UserIDStoreProvider
          initState={{
            userID,
          }}
        >
          <RoomIDStoreProvider
            initState={{
              roomID,
            }}
          >
            <MyUserInfoForRoomStoreProvider
              initState={{
                user: user,
              }}
            >
              {children}
            </MyUserInfoForRoomStoreProvider>
          </RoomIDStoreProvider>
        </UserIDStoreProvider>
      </HostInfoStoreProvider>
    </SocketIO>
  )
}

type Props = {
  userID: string
  roomID: string
  hostID: string
  user: MyUserInfoForRoomStoreState['user']
} & PropsWithChildren
