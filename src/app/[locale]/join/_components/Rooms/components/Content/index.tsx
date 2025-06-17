'use client'

import { api } from '@/trpc/react'
import { RoomItem } from './components/RoomItem'
import dynamic from 'next/dynamic'
import { forwardRef, useImperativeHandle, type Ref } from 'react'
import { sortByAtom } from '../atoms'
import { useAtomValue } from 'jotai'
import type { LangObj } from '@/app/[locale]/join/lang'

const ErrDisplay = dynamic(() => import('@/components/ErrDisplay'))
const Spinner = dynamic(() => import('@/components/Spinner'))

export const Content = forwardRef(
  (
    { noroomText, roomsKeysTexts }: Props,
    ref: Ref<{
      refetch: () => void
    }>,
  ) => {
    const sortBy = useAtomValue(sortByAtom)
    const { data, error, isError, isLoading, refetch, isRefetching } =
      api.gameRoom.getActiveRoomsID.useQuery(
        {
          sortBy,
        },
        {
          refetchOnWindowFocus: false,
        },
      )

    useImperativeHandle(ref, () => ({
      refetch,
    }))

    if (isError) return <ErrDisplay msg={'UNKNOWN'} reason={error.message} />
    if (isLoading || isRefetching)
      return (
        <div className="flex size-36 h-full w-full items-center justify-center">
          <Spinner />
        </div>
      )

    if (data?.length === 0)
      return (
        <div className="w-full animate-fade text-center text-white">
          {noroomText}
        </div>
      )

    return data?.map((ID) => <RoomItem key={ID} ID={ID} roomsKeysTexts={roomsKeysTexts} />)
  },
)

Content.displayName = 'RoomsContent'

type Props = {
  noroomText: string
  roomsKeysTexts: LangObj['roomKeysTexts']
}