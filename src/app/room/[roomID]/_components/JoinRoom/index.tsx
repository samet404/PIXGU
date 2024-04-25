'use client'

import Spinner from '@/components/Spinner'
import { api } from '@/trpc/react'
import { Fragment, type ReactNode } from 'react'
import dynamic from 'next/dynamic'
import { useAtomValue } from 'jotai'
import { roomIDAtom } from '../../atoms'
import { useEffectOnce } from 'usehooks-ts'

const ErrDisplay = dynamic(() => import('@/components/ErrDisplay'))

const JoinRoom = ({ children }: Props) => {
  const roomID = useAtomValue(roomIDAtom)
  const {
    mutate: joinRoom,
    isSuccess,
    isError,
    error,
    isLoading,
  } = api.gameRoom.join.useMutation({})

  useEffectOnce(() =>
    joinRoom({
      roomID: roomID!,
    }),
  )

  return (
    <Fragment>
      {isSuccess ? children : null}

      {isError ? (
        <ErrDisplay msg={'UNKNOWN'} redirectTo={'/'} reason={error.message} />
      ) : null}
      {isLoading ? <Spinner /> : null}
    </Fragment>
  )
}

export default JoinRoom

type Props = {
  children: ReactNode
}
