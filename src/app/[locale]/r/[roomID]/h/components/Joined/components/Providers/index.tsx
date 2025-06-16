'use client'

import type { PropsWithChildren } from 'react'

import {
  UserIDStoreProvider,
  RoomIDStoreProvider,
  MyUserInfoForRoomStoreProvider,
} from '@/zustand/provider'
import { SocketIOProvider } from './components/SocketIO'
import type { Locale } from '@/types/locale'
import type { MyUserInfoForRoomStoreState } from '@/zustand/store/myUserInfoForRoom'

export const Providers = ({ roomID, userID, user, locale, children }: Props) => {
  return (
    <SocketIOProvider roomID={roomID} locale={locale}>
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
    </SocketIOProvider>
  )
}

type Props = {
  locale: Locale
  userID: string
  roomID: string
  user: MyUserInfoForRoomStoreState['user']
} & PropsWithChildren
