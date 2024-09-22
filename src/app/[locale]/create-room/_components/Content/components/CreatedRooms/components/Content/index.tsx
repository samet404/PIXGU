'use client'

import { api } from '@/trpc/react'
import { Room } from './components/Room'
import Spinner from '@/components/Spinner'
import { forwardRef, useEffect, useImperativeHandle, type Ref } from 'react'
import { RefreshBtn } from './components/RefreshBtn'
import { useSetAtom } from 'jotai'
import { createdRoomsCountAtom } from '../../../atoms'

export const Content = forwardRef(
  (
    _: unknown,
    ref: Ref<{
      refetch: () => void
    }>,
  ) => {
    const setCount = useSetAtom(createdRoomsCountAtom)
    const { data, error, isError, refetch, isLoading, isRefetching } =
      api.gameRoom.getCreatedRoomsIDs.useQuery(undefined, {
        refetchOnWindowFocus: false,
      })

    useEffect(() => {
      setCount((data ?? []).length)
    }, [data])

    useImperativeHandle(ref, () => ({
      refetch,
    }))

    return (
      <div className="flex flex-col items-start gap-2">
        <RefreshBtn refetch={refetch} />
        {(isLoading || isRefetching) && <Spinner />}

        {!data ||
          (data.length === 0 && <div className="text-[#f1ffbf]">No rooms</div>)}
        {isError && <div>error</div>}

        {!isLoading &&
          !isRefetching &&
          !isError &&
          data.map((ID) => <Room key={ID} ID={ID} refetch={refetch} />)}
      </div>
    )
  },
)

Content.displayName = 'CreatedRoomsContent'
