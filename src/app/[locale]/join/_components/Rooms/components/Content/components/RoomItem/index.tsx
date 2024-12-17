import { api } from '@/trpc/react'
import Link from 'next/link'
import { PinkValue } from './components/PinkValue'
import Image from 'next/image'
import { Svg } from '@/components/Svg'

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

  const { country, createdAt, distanceInKm, isPublic, name, playerCount, version } = data

  return (
    <div className='flex flex-row animate-fade selection:!bg-[#ff0fbf]'>
      <div className="flex w-full flex-col flex-wrap gap-2 rounded-l-md bg-gradient-to-tr from-[#ffffff7e] via-[#ffffff40] to-[#ffffff7e] p-3 shadow-lg duration-300 hover:opacity-80">
        <div className='text-white text-[1rem]'>
          {name}
        </div>
        <div className='flex flex-row flex-wrap gap-2'>
          <PinkValue value={'Host ' + distanceInKm + ' km away from you'} />
          <PinkValue value={`ID: ${ID}`} />
          <PinkValue value={isPublic ? 'Public' : 'Private'} />
          <PinkValue value={'Country: ' + country} />
          <PinkValue value={`Players: ${playerCount}/10`} />
          <PinkValue value={`Version: ${version}`} />
          <PinkValue
            value={`Created at: ${new Date(createdAt).toDateString()} ${new Date(createdAt).getHours()}:${new Date(createdAt).getMinutes()}:${new Date(createdAt).getSeconds()}`}
          />
        </div>


      </div>
      <Link
        href={`/r/${ID}`}
        className="rounded-r-md bg-gradient-to-tr flex items-center hover:from-[#81fb7b90] hover:to-[#7cfc76b1] justify-center from-[#73d36e90] to-[#9fff9ab1] pr-2 pl-[0.4rem] py-1 text-white"
      >
        <Svg src='arrow-right-in-388-svgrepo-com.svg' alt='join svg' className='size-8 opacity-65 drop-shadow-xl' />
      </Link>
    </div>
  )
}

type Props = {
  ID: string
}
