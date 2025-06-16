'use client'

import type { PropsWithChildren } from 'react'

import {
  HostInfoStoreProvider,
  UserIDStoreProvider,
  RoomIDStoreProvider,
  MyUserInfoForRoomStoreProvider,
} from '@/zustand/provider'
import { SocketIOProvider } from './components/SocketIO'
import { Password } from './components/Password'
import type { Locale, Guest } from '@/types'

// TODO implement better auth

export const Providers = ({
  roomID,
  userID,
  hostID,
  locale,
  guest,
  havePassword,
  children,
}: Props) => {
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
              userID: userID,
            }}
          >
            <RoomIDStoreProvider
              initState={{
                roomID,
              }}
            >
              <MyUserInfoForRoomStoreProvider
                initState={{
                  user: guest,
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
  guest: Guest
  havePassword: boolean
} & PropsWithChildren
