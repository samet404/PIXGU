import type { Locale } from '@/types'
import { api } from '@/trpc/server'
import dynamic from 'next/dynamic'
import { redisDb } from '@/db/redis'

const ErrDisplay = dynamic(() => import('@/components/ErrDisplay'))
const JoinedRoom = dynamic(() => import('./components/JoinedRoom'))

const Content = async ({ params }: Props) => {
  const roomID = params.roomID
  const user = await api.auth.getUser.query()
  if (!user) throw new Error('UNAUTHORIZED')

  try {
    const { isUserHavePermToJoin } = await import('./func')
    await isUserHavePermToJoin(user.id, roomID)

    const hostID = await redisDb.get<string>(`room:${roomID}:host_ID`)
    if (!hostID) throw new Error('NO_HOST_ID')

    await redisDb.sadd(`room:${roomID}:active_players`, user.id)

    const { setServerContexts } = await import('./func')
    setServerContexts(params.locale, roomID, user, hostID)

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

      return <ErrDisplay msg={e.message} />
    }

    return <ErrDisplay msg="UNKNOWN" />
  }
}

export default Content

type Props = {
  params: {
    locale: Locale
    roomID: string
  }
}
