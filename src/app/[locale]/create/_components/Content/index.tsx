'use client'

import { Fragment, useRef, type PropsWithChildren } from 'react'
import GradientContainer from './components/GradientContainer'
import CreateRoomButton from './components/CreateRoomButton'
import { CreatedRooms } from './components/CreatedRooms'

export const Content = ({ children }: PropsWithChildren) => {
  const createdRoomsRef = useRef<{
    refetch: () => void
  }>(null)

  return (
    <Fragment>
      <GradientContainer>
        {children}
        <CreateRoomButton createdRoomsRef={createdRoomsRef} />
      </GradientContainer>
      <CreatedRooms ref={createdRoomsRef} />
    </Fragment>
  )
}
