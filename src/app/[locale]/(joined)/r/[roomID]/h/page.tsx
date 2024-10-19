import type { Locale } from '@/types'
import { api } from '@/trpc/server'
import dynamic from 'next/dynamic'
import type { Metadata } from 'next'
import { setServerContexts } from './func'

const JoinedRoom = dynamic(() => import('./components/Joined'))

export const metadata: Metadata = {
  title: 'HOSTING',
}

const Content = async ({ params }: Props) => {
  const roomID = params.roomID
  const user = await api.auth.getUser.query()
  const guest = await api.auth.getGuest.query()

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
