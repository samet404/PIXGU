import { api } from '@/trpc/server'
import type { Locale } from '@/types/locale'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const Joined = dynamic(() => import('./_components/Home'))
const Start = dynamic(() => import('./_components/Start'))

export const metadata: Metadata = {
  title: 'Free Online Drawing & Guessing Game'
}

const Home = async ({
  params,
}: {
  params: Promise<
    {
      locale: Locale
    }>
}) => {
  const isJoined = await api.auth.isJoined.query()

  if (isJoined) return <Joined locale={(await params).locale} />
  return <Start />
}

export default Home