'use client'

import type { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import CanvasesData from './components/CanvasesData'
import Peers from './components/Peers'
import RoomID from './components/RoomID'
import UserID from './components/UserID'
import { ComposedProviders } from '@/components/ComposedProviders'

const AblyClient = dynamic(() => import('./components/AblyClient'), {
  ssr: false,
})

const Providers = ({ roomID, userID, children }: Props) => (
  <UserID UserID={userID}>
    <RoomID roomID={roomID}>
      <AblyClient roomID={roomID}>
        <Peers>
          <CanvasesData>{children}</CanvasesData>
        </Peers>
      </AblyClient>
    </RoomID>
  </UserID>
)

export default Providers

type Props = {
  roomID: string
  userID: string
  children: ReactNode
}
