'use client'

import { api } from '@/trpc/react'
import RoomItem from './components/RoomItem'
import dynamic from 'next/dynamic'
import { useAtomValue } from 'jotai'
import { roomsOffsetAtom } from '../../../atoms'
import { Urbanist } from 'next/font/google'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['600'],
})

const ErrDisplay = dynamic(() => import('@/components/ErrDisplay'))
const Spinner = dynamic(() => import('@/components/Spinner'))

const Content = () => {
  const offset = useAtomValue(roomsOffsetAtom)
  const { data, error, isError, isLoading } = api.gameRoom.getRooms.useQuery({
    name: null,
    offset: 0,
  })

  if (isError) return <ErrDisplay msg={'UNKNOWN'} reason={error.message} />
  if (isLoading)
    return (
      <div className="flex size-36 h-full w-full items-center justify-center">
        <Spinner />
      </div>
    )

  if (data.length === 0)
    return (
      <div
        className={`${urbanist.className} w-full animate-fade text-center text-white`}
      >
        No available room found
      </div>
    )

  return data.map((room, i) => (
    <RoomItem key={i} id={room.ID} name={room.name} />
  ))
}
export default Content
