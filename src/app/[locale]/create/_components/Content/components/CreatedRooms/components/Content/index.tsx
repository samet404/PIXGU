'use client'

import { api } from '@/trpc/react'
import { Room } from './components/Room'
import Spinner from '@/components/Spinner'
import { forwardRef, useEffect, useImperativeHandle, type Ref } from 'react'
import { RefreshBtn } from './components/RefreshBtn'
import { useSetAtom } from 'jotai'
import { createdRoomsCountAtom } from '../../../atoms'
import { useSocketIO } from '@/zustand/store/useSocketIO'
import type { LangObj } from '@/app/[locale]/create/lang'

export const Content = forwardRef(
  (
    { roomsDataLang }: Props,
    ref: Ref<{
      refetch: () => void
    }>,
  ) => {
    console.log('roomsDataLang', roomsDataLang)
    const io = useSocketIO(s => s.io)
    const setCount = useSetAtom(createdRoomsCountAtom)
    const { data, isError, refetch, isLoading, isRefetching } =
      api.gameRoom.getCreatedRoomsIDs.useQuery(undefined, {
        refetchOnWindowFocus: false,
      })

    useEffect(() => {
      setCount((data ?? []).length)
    }, [data])

    useEffect(() => {
      io!.on('killed', () => {
        refetch()
      })
    }, [])

    useImperativeHandle(ref, () => ({
      refetch,
    }))

    return (
      <div className="flex flex-col items-start gap-2">
        <RefreshBtn refetch={refetch} />
        {(isLoading || isRefetching) && <Spinner />}

        {!data ||
          (data.length === 0 && <div className="text-[#f1ffbf]">{roomsDataLang.noRoomsText}</div>)}
        {isError && <div>{roomsDataLang.errorText}</div>}

        {!isLoading &&
          !isRefetching &&
          !isError &&
          data.map((ID) => <Room key={ID} ID={ID} refetch={refetch} lang={roomsDataLang} />)}
      </div>
    )
  },
)

Content.displayName = 'CreatedRoomsContent'

type Props = {
  roomsDataLang: LangObj['roomsData']
}