import { api } from '@/trpc/server'
import type { Locale } from '@/types/locale'
import type { Metadata } from 'next'
import Main from './_components/Home'
import Start from './_components/Start'

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
  const isJoined = await api.auth.isJoined()
  const { locale } = await params


  if (isJoined) return <Main locale={locale} />
  return <Start />
}

export default Home