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

const SoketiClient = dynamic(
  () => import('./components/SoketiClient').then((m) => m.SoketiClient),
  {
    ssr: false,
  },
)

export const Providers = ({
  roomID,
  userID,
  hostID,
  isHostPlayer,
  user,
  children,
}: Props) => {
  return (
    <HostInfoStoreProvider
      initState={{
        amIHost: userID === hostID,
        hostID,
        isPlayer: isHostPlayer,
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
            <SoketiClient roomID={roomID}>{children}</SoketiClient>
          </MyUserInfoForRoomStoreProvider>
        </RoomIDStoreProvider>
      </UserIDStoreProvider>
    </HostInfoStoreProvider>
  )
}

type Props = {
  userID: string
  roomID: string
  hostID: string
  user: MyUserInfoForRoomStoreState['user']
  isHostPlayer: boolean
} & PropsWithChildren
