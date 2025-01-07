'use client'

import { Fragment, useRef, type PropsWithChildren } from 'react'
import GradientContainer from './components/GradientContainer'
import CreateRoomButton from './components/CreateRoomButton'
import { CreatedRooms } from './components/CreatedRooms'
import type { LangObj } from '../../lang'

export const Content = ({ children, createRoomBtnText, createdRoomsCount, createdRoomsText, roomsDataLang }: Props) => {
  const createdRoomsRef = useRef<{
    refetch: () => void
  }>(null)
  console.log('roomsDataLang3', roomsDataLang)

  return (
    <Fragment>
      <GradientContainer>
        {children}
        <CreateRoomButton lang={createRoomBtnText} createdRoomsRef={createdRoomsRef} />
      </GradientContainer>
      <CreatedRooms createdRoomsCount={createdRoomsCount} createdRoomsText={createdRoomsText} roomsDataLang={roomsDataLang} ref={createdRoomsRef} />
    </Fragment>
  )
}

type Props = PropsWithChildren<{
  createdRoomsCount: string
  createdRoomsText: string
  createRoomBtnText: LangObj['createRoomBtnText']
  roomsDataLang: LangObj['roomsData']
}>