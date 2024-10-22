import type { Locale } from '@/types'
import { api } from '@/trpc/server'
import dynamic from 'next/dynamic'
import { setServerContexts } from './func'

const JoinedRoom = dynamic(() => import('./components/JoinedRoom'))
const ErrDisplay = dynamic(() => import('@/components/ErrDisplay'))

const Content = async ({ params }: Props) => {
  const roomID = params.roomID
  const user = await api.auth.getUser.query()
  const guest = await api.auth.getGuest.query()
  console.log('user: ', user)
  console.log('guest: ', guest)
  if (!user && !guest)
    return (
      <ErrDisplay
        msg="UNAUTHORIZED"
        reason="You need to be joined"
        redirectTo="/login"
      />
    )

  setServerContexts(params.locale, roomID, user, guest, !!guest)

  return <JoinedRoom />
}

export default Content

type Props = {
  params: {
    locale: Locale
    roomID: string
  }
}
