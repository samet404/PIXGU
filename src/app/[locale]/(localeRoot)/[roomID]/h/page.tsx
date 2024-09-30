import type { Locale } from '@/types'
import { api } from '@/trpc/server'
import dynamic from 'next/dynamic'
import { redisDb } from '@/db/redis'
import type { Metadata } from 'next'
import { env } from '@/env/server'

const ErrDisplay = dynamic(() => import('@/components/ErrDisplay'))
const JoinedRoom = dynamic(() => import('./components/Joined'))

export const metadata: Metadata = {
  title: 'HOSTING',
}

const Content = async ({ params }: Props) => {
  const isProd = env.NODE_ENV === 'production'
  const roomID = params.roomID
  const user = await api.auth.getUser.query()
  if (!user) throw new Error('UNAUTHORIZED')

  try {
    // const { isUserHavePermToJoin } = await import('./func')
    // await isUserHavePermToJokin(user.id, roomID)

    const hostID = await redisDb.get(`room:${roomID}:host_ID`)
    if (!isProd) console.log('awaiting hostID', hostID)
    if (!hostID) throw new Error('NO_HOST_ID')

    await redisDb.sadd(`room:${roomID}:active_players`, user.id)
    if (!isProd) console.log('awaiting redisDb.sadd')

    const { setServerContexts } = await import('./func')
    setServerContexts(params.locale, roomID, user, hostID)
    if (!isProd) console.log('awaiting setServerContexts')

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
