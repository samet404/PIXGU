'use client'

import { api } from '@/trpc/react'
import Spinner from '@/components/Spinner'
import User from '../../User'

const Other = ({ ID }: Props) => {
  const { data, isLoading } = api.user.getById.useQuery(
    {
      ID,
      config: {
        usernameID: false,
        username: false,
      },
    },
    {
      refetchOnWindowFocus: false,
    },
  )

  if (isLoading || !data)
    return (
      <div className="flex w-full items-center justify-center py-4">
        <Spinner />
      </div>
    )

  if (data)
    return (
      <User
        name={data.usernameWithUsernameID!}
        profilePicture={data.profilePicture}
      />
    )
}

export default Other

type Props = {
  ID: string
}
