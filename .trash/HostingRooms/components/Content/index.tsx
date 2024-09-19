'use client'

import { api } from '@/trpc/react'
import { Room } from './components/Room'
import Spinner from '@/components/Spinner'

export const Content = () => {
  const { data, error, isError, isLoading } =
    api.gameRoom.getPlayingRooms.useQuery(undefined, {
      refetchOnWindowFocus: false,
    })

  if (isLoading) return <Spinner />

  if (!data || data.length === 0)
    return <div className="text-[#f1ffbf]">No rooms</div>

  return data.map(({ ID, name, amIHost, isPublic, createdAt }) => (
    <Room
      key={ID}
      ID={ID}
      name={name}
      amIHost={amIHost}
      isPublic={isPublic}
      createdAt={createdAt}
    />
  ))
}
