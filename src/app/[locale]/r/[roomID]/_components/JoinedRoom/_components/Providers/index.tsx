'use client'

import type { PropsWithChildren } from 'react'

import {
  HostInfoStoreProvider,
  UserIDStoreProvider,
  RoomIDStoreProvider,
  MyUserInfoForRoomStoreProvider,
} from '@/zustand/provider'
import { SocketIOProvider } from './components/SocketIO'
import type { User } from 'lucia'
import { Password } from './components/Password'
import type { Locale, Guest } from '@/types'

export const Providers = ({
  roomID,
  userID,
  hostID,
  locale,
  user,
  guest,
  havePassword,
  children,
}: Props) => {
  console.log('providers: ', user, guest)
  return (
    <Password havePassword={havePassword}>
      <SocketIOProvider locale={locale} roomID={roomID}>
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
    </Password>
  )
}

type Props = {
  locale: Locale
  userID: string
  roomID: string
  hostID: string
  user: User | null
  guest: Guest | null
  havePassword: boolean
} & PropsWithChildren
