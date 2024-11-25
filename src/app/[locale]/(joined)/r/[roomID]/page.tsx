import Content from './_components/Content'
import type { Locale } from '@/types/locale'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IN GAME',
}

const Room = async ({ params }: Props) => {
  return <Content params={await params} />
}

export default Room

type Props = {
  params: Promise<{
    locale: Locale
    roomID: string
  }>
}
