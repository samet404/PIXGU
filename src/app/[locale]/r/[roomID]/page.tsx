import type { Metadata } from 'next'
import type { Locale } from '@/types/locale'
import { api } from '@/trpc/server'
import JoinedRoom from './_components/JoinedRoom'
import { Login } from '@/components/Login'
import { roomIDSchema } from '@/zod/schema'
import { notFound } from 'next/navigation'
import { env } from '@/env/server'

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
    title: roomID,

    openGraph: {
      type: 'website',
      ...openGraph
    },

    twitter: openGraph
  }

}

const Room = async ({
  params
}: Props) => {
  const { roomID, locale } = await params
  const isJoined = await api.auth.isJoined()

  try {
    roomIDSchema.parse(roomID)
  } catch (error) {
    return notFound()
  }

  const isRoomExits = await api.gameRoom.isExits({ roomID })
  if (!isRoomExits) return notFound()

  if (!isJoined) return <Login guest={true} redirectToRoomID={roomID} locale={locale} />
  return <JoinedRoom roomID={roomID} locale={locale} />
}

export default Room


type Props = {
  params: Promise<{
    roomID: string
    locale: Locale
  }>
}