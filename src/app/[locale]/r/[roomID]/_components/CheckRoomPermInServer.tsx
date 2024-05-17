import ErrDisplay from '@/components/ErrDisplay'
import { getRoomID } from '@/context/server'
import { api } from '@/trpc/server'
import { Fragment, type ReactNode } from 'react'

const CheckRoomPermInServer = async ({ children }: Props) => {
  const roomID = getRoomID()!
  console.log(roomID + ' from CheckRoomPermInServer')
  console.log('checkRoomPermInServer roomID ', roomID)

  // Maybe user tried to hack the password system by changing react state in joinWithPass component
  const isUserReallyKnowPass = await api.gameRoom.isUserKnowPass.query({
    roomID: roomID,
  })

  return isUserReallyKnowPass ? (
    <Fragment>{children}</Fragment>
  ) : (
    <ErrDisplay msg="UNAUTHORIZED" reason="Enter true password" />
  )
}

export default CheckRoomPermInServer

type Props = {
  children: ReactNode
}
