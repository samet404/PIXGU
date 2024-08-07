import type { Locale } from '@/types'
import { api } from '@/trpc/server'
import dynamic from 'next/dynamic'

const ErrDisplay = dynamic(() => import('@/components/ErrDisplay'))
const PassBox = dynamic(() => import('./_components/PassBox'))

const Password = async ({ params }: Props) => {
  const roomID = params.roomID

  const user = await api.auth.getUser.query()
  if (!user) throw new Error('UNAUTHORIZED')

  const { ablyBasicClient } = await import('@/utils/ablyBasicClient')
  const { ablyClient } = await ablyBasicClient()

  try {
    const { isUserHavePermToJoin } = await import('../func')

    const roomChannel = ablyClient.channels.get(`room:${roomID}`)
    await isUserHavePermToJoin(user.id, roomID, roomChannel)

    const { setServerContexts } = await import('../func')
    setServerContexts(params.locale, roomID, user)

    const { redirect } = await import('next/navigation')

    ablyClient.channels.get('*').unsubscribe()
    ablyClient.close()

    redirect(`/r/${roomID}`)
  } catch (e) {
    ablyClient.channels.get('*').unsubscribe()
    ablyClient.close()

    if (e instanceof Error) {
      if (e.message === 'PASSWORD_REQUIRED') return <PassBox />

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

      if (e.message === 'BLOCKED')
        return (
          <ErrDisplay
            msg="UNAUTHORIZED"
            reason="You have blocked from this room"
          />
        )

      throw new Error(e.message)
    }
  }
}

export default Password

type Props = {
  params: {
    locale: Locale
    roomID: string
  }
}
