import { api } from '@/trpc/react'
import Link from 'next/link'
import { GreenValue } from './components/GreenValue'
import { PinkValue } from './components/PinkValue'

export const RoomItem = ({ ID }: Props) => {
  const { data, isLoading, isError, error } = api.gameRoom.getByID.useQuery(ID)

  if (isLoading)
    return (
      <div className="flex h-[3rem] w-full animate-pulse rounded-md bg-gradient-to-tr from-[#ffffff7e] via-[#ffffff40] to-[#ffffff7e] p-3 shadow-lg duration-300 hover:opacity-80 "></div>
    )

  if (isError) console.error(error)
  if (!data) {
    import('@/utils/negativeLog').then((m) =>
      m.negativeLog(`Data not found for room ${ID}`),
    )
    return null
  }

  const { country, createdAt, distanceInKm, isPublic, name } = data

  return (
    <div className="flex w-full animate-fade flex-row flex-wrap gap-2 rounded-md bg-gradient-to-tr from-[#ffffff7e] via-[#ffffff40] to-[#ffffff7e] p-3 shadow-lg duration-300 hover:opacity-80">
      <GreenValue value={name} />
      <PinkValue value={ID} />
      <PinkValue value={isPublic ? 'Public' : 'Private'} />
      <PinkValue value={distanceInKm + ' km away'} />
      <PinkValue value={country} />
      <PinkValue
        value={`${new Date(createdAt).toDateString()} ${new Date(createdAt).getHours()}:${new Date(createdAt).getMinutes()}:${new Date(createdAt).getSeconds()}`}
      />

      <Link
        href={`/r/${ID}`}
        className="rounded-md bg-gradient-to-tr from-[#73d36e90] to-[#9fff9ab1] px-2 py-1 text-white"
      >
        Join
      </Link>
    </div>
  )
}

type Props = {
  ID: string
}
