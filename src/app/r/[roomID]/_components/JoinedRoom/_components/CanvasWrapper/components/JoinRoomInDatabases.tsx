import { api } from '@/trpc/server'
import { getLastPartOfPathnameServer } from '@/utils/getLastPartOfPathnameServer'
import { Fragment, type ReactNode } from 'react'

const JoinRoomInDatabases = async ({ children }: Props) => {
  const roomID = getLastPartOfPathnameServer()
  await api.gameRoom.join.mutate({ roomID: roomID })

  return <Fragment>{children}</Fragment>
}

export default JoinRoomInDatabases

type Props = {
  children: ReactNode
}
