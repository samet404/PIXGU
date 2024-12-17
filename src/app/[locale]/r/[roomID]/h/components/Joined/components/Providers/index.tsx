'use client'

import type { PropsWithChildren } from 'react'

import {
  UserIDStoreProvider,
  RoomIDStoreProvider,
  MyUserInfoForRoomStoreProvider,
} from '@/zustand/provider'
import { type MyUserInfoForRoomStoreState } from '@/zustand/store'
import { SocketIOProvider } from './components/SocketIO'

export const Providers = ({ roomID, userID, user, children }: Props) => {
  return (
    <SocketIOProvider roomID={roomID}>
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
  userID: string
  roomID: string
  user: MyUserInfoForRoomStoreState['user']
} & PropsWithChildren
