'use client'

import Spinner from '@/components/Spinner'
import { api } from '@/trpc/react'
import Link from 'next/link'

export const Room = ({ ID, refetch }: Props) => {
  const { mutateAsync: kill } = api.gameRoom.killRoom.useMutation()
  const { data, error, isError, isLoading } =
    api.gameRoom.getCreatedRoom.useQuery({ ID })

  if (isLoading || !data) return <Spinner />

  const { createdAt, isPublic, name } = data

  return (
    <div className="flex animate-fade flex-row flex-wrap gap-2 rounded-lg bg-gradient-to-tr from-[#ffffff40] via-[#ffffff17] to-[#ffffff40] p-2  backdrop-blur-md">
      <div className="rounded-md bg-[#ffffff52] px-2 py-1 text-white">
        ID: {ID}
      </div>
      <div className="rounded-md bg-[#ffffff52] px-2 py-1 text-white">
        name: {name}
      </div>

      <div className="rounded-md bg-[#ffffff52] px-2 py-1 text-white">
        {isPublic ? 'Public' : 'Private'}
      </div>
      <div className="rounded-md bg-[#ffffff52] px-2 py-1 text-white">
        date: {createdAt.toString()}
      </div>
      <Link
        className="rounded-md bg-[#03ff92a0] px-2 py-1 font-[900] text-[#00000074] duration-300 hover:opacity-70"
        href={`/r/${ID}/h`}
        target="_blank"
      >
        Go to room
      </Link>
      <button
        onMouseDown={async () => {
          await kill({ ID })
          refetch()
        }}
        className="rounded-md bg-[#ff0342a2] px-2 py-1 font-[900] text-[#00000074] duration-300 hover:opacity-70"
      >
        Kill room
      </button>
    </div>
  )
}

type Props = {
  ID: string
  refetch: () => void
}
