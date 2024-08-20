// 'use client'

import { RoomIDStoreContext, RoomIDStoreProvider } from '@/zustand/provider'
// import { useCountStore } from '@/zustand/store'
import type { PropsWithChildren } from 'react'
import * as Ably from 'ably'

export const Parent = ({ a, children }: Props) => {
  //   useCountStore.setState({ count: a })
  const ablyClient = new Ably.Realtime({
    authUrl: `/r/${'roomID'}/api/ably/auth/token`,
    authMethod: 'POST',
    echoMessages: false,
  })

  return (
    <RoomIDStoreProvider
      initState={{
        roomID: a.toString(),
      }}
    >
      {children}
    </RoomIDStoreProvider>
  )
}

type Props = PropsWithChildren<{ a: number }>
