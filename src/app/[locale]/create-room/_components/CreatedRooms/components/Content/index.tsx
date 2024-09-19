'use client'

import { api } from '@/trpc/react'
import { Room } from './components/Room'
import Spinner from '@/components/Spinner'

export const Content = () => {
  const { data, error, isError, refetch, isLoading } =
    api.gameRoom.getCreatedRoomsIDs.useQuery(undefined)

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        onMouseDown={() => refetch()}
        className="rounded-md bg-[#03ff92a0] px-2 py-1 font-[900] text-[#00000074] duration-300 hover:opacity-70"
      >
        Refresh
      </button>
      {isLoading && <Spinner />}
      {!data ||
        (data.length === 0 && <div className="text-[#f1ffbf]">No rooms</div>)}
      {isError && <div>error</div>}
      {!isLoading &&
        !isError &&
        data.map((ID) => <Room key={ID} ID={ID} refetch={refetch} />)}
    </div>
  )
}
