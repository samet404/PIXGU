import { Suspense } from 'react'
import Content from './_components/Content'
import type { Locale } from '@/types/locale'
import Spinner from '@/components/Spinner'

const Room = ({ params }: Props) => {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <Spinner />
        </div>
      }
    >
      <Content params={params} />
    </Suspense>
  )
}

export default Room

type Props = {
  params: {
    locale: Locale
    roomID: string
  }
}
