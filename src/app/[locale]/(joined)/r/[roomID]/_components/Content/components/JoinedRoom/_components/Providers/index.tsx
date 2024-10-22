'use client'

import type { PropsWithChildren } from 'react'

import {
  HostInfoStoreProvider,
  UserIDStoreProvider,
  RoomIDStoreProvider,
  MyUserInfoForRoomStoreProvider,
} from '@/zustand/provider'
import { SocketIOProvider } from './components/SocketIO'
import type { Guest } from '@/types/guest'
import type { User } from 'lucia'

export const Providers = ({
  roomID,
  userID,
  hostID,
  user,
  guest,
  children,
}: Props) => {
  console.log('providers: ', user, guest)
  return (
    <SocketIOProvider roomID={roomID}>
      <HostInfoStoreProvider
        initState={{
          amIHost: userID === hostID,
          hostID,
          isPlayer: true,
        }}
      >
        <UserIDStoreProvider
          initState={{
            userID: user ? user.id : guest!.ID,
          }}
        >
          <RoomIDStoreProvider
            initState={{
              roomID,
            }}
          >
            <MyUserInfoForRoomStoreProvider
              initState={{
                user: user ?? guest!,
              }}
            >
              {children}
            </MyUserInfoForRoomStoreProvider>
          </RoomIDStoreProvider>
        </UserIDStoreProvider>
      </HostInfoStoreProvider>
    </SocketIOProvider>
  )
}

type Props = {
  userID: string
  roomID: string
  hostID: string
  user: User | null
  guest: Guest | null
} & PropsWithChildren
