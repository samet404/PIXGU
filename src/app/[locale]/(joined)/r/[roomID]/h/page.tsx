import type { Locale } from '@/types'
import { api } from '@/trpc/server'
import dynamic from 'next/dynamic'
import type { Metadata } from 'next'
import { setServerContexts } from './func'
import { PreventRefresh } from '@/components/PreventRefresh'

const JoinedRoom = dynamic(() => import('./components/Joined'))

export const metadata: Metadata = {
  title: 'HOSTING',
}

const Content = async ({ params }: Props) => {
  const roomID = (await params).roomID
  const user = await api.auth.getUser.query()
  const guest = await api.auth.getGuest.query()

  setServerContexts((await params).locale, roomID, user, guest, !!guest)

  return <PreventRefresh><JoinedRoom roomID={roomID} user={user} guest={guest} /></PreventRefresh>
}

export default Content

type Props = {
  params: Promise<{
    locale: Locale
    roomID: string
  }>
}
