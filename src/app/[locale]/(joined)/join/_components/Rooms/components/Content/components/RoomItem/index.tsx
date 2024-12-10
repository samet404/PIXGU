import { api } from '@/trpc/react'
import Link from 'next/link'
import { PinkValue } from './components/PinkValue'

export const RoomItem = ({ ID }: Props) => {
  const { data, isLoading, isError, error } = api.gameRoom.getByID.useQuery(ID, {
    refetchOnWindowFocus: true
  })

  if (isLoading)
    return (
      <div className="flex h-[6rem] w-full animate-pulse rounded-md bg-gradient-to-tr from-[#ffffff7e] via-[#ffffff40] to-[#ffffff7e] p-3 shadow-lg duration-300 hover:opacity-80 "></div>
    )

  if (isError) console.error(error)
  if (!data) {
    import('@/utils/negativeLog').then((m) =>
      m.negativeLog(`Data not found for room ${ID}`),
    )
    return null
  }

  const { country, createdAt, distanceInKm, isPublic, name, playerCount } = data

  return (
    <div className='flex flex-row selection:!bg-[#ff0fbf]'>
      <div className="flex w-full animate-fade flex-col flex-wrap gap-2 rounded-l-md bg-gradient-to-tr from-[#ffffff7e] via-[#ffffff40] to-[#ffffff7e] p-3 shadow-lg duration-300 hover:opacity-80">
        <div className='text-white text-[1.2rem]'>
          {name}
        </div>
        <div className='flex flex-row flex-wrap gap-2'>
          <PinkValue value={distanceInKm + ' km away from you'} />
          <PinkValue value={`ID: ${ID}`} />
          <PinkValue value={isPublic ? 'Public' : 'Private'} />
          <PinkValue value={'country: ' + country} />
          <PinkValue value={`players: ${playerCount}/10`} />
          <PinkValue
            value={`Created at: ${new Date(createdAt).toDateString()} ${new Date(createdAt).getHours()}:${new Date(createdAt).getMinutes()}:${new Date(createdAt).getSeconds()}`}
          />
        </div>


      </div>
      <Link
        href={`/r/${ID}`}
        className="rounded-r-md bg-gradient-to-tr flex items-center justify-center from-[#73d36e90] to-[#9fff9ab1] px-2 py-1 text-white"
      >
        JOIN
      </Link>
    </div>
  )
}

type Props = {
  ID: string
}
