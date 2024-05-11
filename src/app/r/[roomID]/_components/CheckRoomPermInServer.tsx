import ErrDisplay from '@/components/ErrDisplay'
import { api } from '@/trpc/server'
import { getLastPartOfPathnameServer } from '@/utils/getLastPartOfPathnameServer'
import { Fragment, type ReactNode } from 'react'

const CheckRoomPermInServer = async ({ children }: Props) => {
  const roomID = getLastPartOfPathnameServer()

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
