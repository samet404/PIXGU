import { Suspense } from 'react'
import Content from './_components/Content'
import type { Locale } from '@/types/locale'
import Spinner from '@/components/Spinner'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IN GAME',
}

const Room = ({ params }: Props) => {
  return <Content params={params} />
}

export default Room

type Props = {
  params: {
    locale: Locale
    roomID: string
  }
}
