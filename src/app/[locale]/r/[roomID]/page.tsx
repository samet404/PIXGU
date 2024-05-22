import type { Locale } from '@/types'
import { api } from '@/trpc/server'
import dynamic from 'next/dynamic'

const ErrDisplay = dynamic(() => import('@/components/ErrDisplay'))
const JoinedRoom = dynamic(() => import('./_components/JoinedRoom'))

const Room = async ({ params }: Props) => {
  const roomID = params.roomID

  try {
    const user = await api.auth.getUser.query()
    if (!user) throw new Error('UNAUTHORIZED')

    const userID = user.id

    const { isUserHavePermToJoin } = await import('./func')
    await isUserHavePermToJoin(userID, roomID)

    const { waitServer } = await import('./func')
    await waitServer({ userID, roomID })

    const { setServerContexts } = await import('./func')
    setServerContexts(params.locale, roomID, user)

    return <JoinedRoom />
  } catch (e) {
    if (e instanceof Error) {
      if (e.message === 'UNAUTHORIZED')
        return (
          <ErrDisplay
            msg="UNAUTHORIZED"
            reason="You need to be logged in to join a room"
            code={401}
            redirectTo="/login"
          />
        )

      if (e.message === 'ROOM_NOT_FOUND')
        return (
          <ErrDisplay
            msg="NOT FOUND"
            reason="This room does not exist"
            code={404}
          />
        )

      if (e.message === 'ALREADY_IN_ROOM')
        return (
          <ErrDisplay
            msg="BAD REQUEST"
            reason="You are already in this room in another tab"
          />
        )

      if (e.message === 'PASSWORD_REQUIRED')
        return (await import('next/navigation')).redirect(`/r/${roomID}/p`)

      if (e.message === 'BLOCKED')
        return (
          <ErrDisplay
            msg="UNAUTHORIZED"
            reason="You have blocked from this room"
          />
        )
    }

    return <ErrDisplay msg="UNKNOWN" />
  }
}

export default Room

type Props = {
  params: {
    locale: Locale
    roomID: string
  }
}
