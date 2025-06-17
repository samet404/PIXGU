import type { Locale } from '@/types'
import { api } from '@/trpc/server'
import type { Metadata } from 'next'
import { redisDb } from '@/db/redis'
import { redirect } from 'next/navigation'
import Joined from './components/Joined'
import { env } from '@/env/server'
import { getLangObj } from './lang'

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { roomID } = await params

  const openGraph = {
    title: `YOU INVITED TO ROOM ${roomID}`,
    images: [
      {
        url: `${env.BASE_URL}/image/png/startbg.png`,
        alt: 'pixgu.com background',
      },
    ],

    description: "Someone invited you to PIXGU, Let's create something cool ✨ | Log in with your nickname",
  }


  return {
    title: `H-${roomID}`,

    openGraph: {
      type: 'website',
      ...openGraph
    },

    twitter: openGraph
  }

}



const Content = async ({ params }: Props) => {
  const { locale, roomID } = await params

  const isJoined = await api.auth.isJoined()
  if (!isJoined) redirect(`/${locale}/r/${roomID}`)

  const langObj = await getLangObj(locale)
  const guest = await api.auth.getGuest()
  const hostID = await redisDb.get(`room:${roomID}:host_ID`)

  const clientID = guest!.ID

  if (hostID !== clientID) redirect(`/${locale}/r/${roomID}`)

  return <Joined langObj={langObj} roomID={roomID} guest={guest} locale={locale} />
}

export default Content

type Props = {
  params: Promise<{
    locale: Locale
    roomID: string
  }>
}
