import './_styles/scrollbars.css'
import { api } from '@/trpc/server'
import dynamic from 'next/dynamic'
import type { Locale } from '@/types'

const ErrDisplay = dynamic(() => import('@/components/ErrDisplay'))
const JoinWithPassContainer = dynamic(
  () => import('./_components/JoinWithPassContainer'),
)
const JoinedRoom = dynamic(() => import('./_components/JoinedRoom'))

const Room = async ({ params }: Props) => {
  const isLogged = await api.auth.isLogged.query()

  if (!isLogged)
    return (
      <ErrDisplay
        msg="UNAUTHORIZED"
        reason="You need to be logged in to join a room"
        code={401}
        redirectTo="/login"
      />
    )

  const user = await api.auth.getUser.query()

  if (!user)
    return (
      <ErrDisplay
        msg="UNAUTHORIZED"
        reason="You need to be logged in to join a room"
        code={401}
        redirectTo="/login"
      />
    )

  import('@/context/server').then((m) => m.setIsLogged(isLogged))
  import('@/context/server').then((m) => m.setLocale(params.locale))
  import('@/context/server').then((m) => m.setUser(user))
  import('@/context/server').then((m) => m.setUserID(user.id))

  const roomID = params.roomID
  import('@/context/server').then((m) => m.setRoomID(roomID))

  const roomExists = await api.gameRoom.isExits.query({ roomID: roomID })

  if (!roomExists) return (await import('next/navigation')).notFound()

  const isRoomHavePass = await api.gameRoom.isHavePass.query({
    roomID: roomID,
  })

  if (isRoomHavePass) return <JoinWithPassContainer />
  return <JoinedRoom />
}

export default Room

type Props = {
  params: {
    locale: Locale
    roomID: string
  }
}
