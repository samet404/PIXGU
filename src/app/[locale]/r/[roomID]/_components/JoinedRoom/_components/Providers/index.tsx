'use client'

import type { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import CanvasesData from './components/CanvasesData'
import Peers from './components/Peers'
import RoomID from './components/RoomID'
import UserID from './components/UserID'
import { ComposedProviders } from '@/components/ComposedProviders'
import { RoomPlayersIDs } from './components/RoomPlayersIDs'
import * as Ably from 'ably'

const AblyClient = dynamic(() => import('./components/AblyClient'), {
  ssr: false,
})

const Providers = ({ roomID, userID, children }: Props) => {
  return (
    <UserID UserID={userID}>
      <RoomID roomID={roomID}>
        <RoomPlayersIDs>
          <AblyClient roomID={roomID}>
            <Peers>
              <CanvasesData>{children}</CanvasesData>
            </Peers>
          </AblyClient>
        </RoomPlayersIDs>
      </RoomID>
    </UserID>
  )
}

export default Providers

type Props = {
  roomID: string
  userID: string
  children: ReactNode
}
