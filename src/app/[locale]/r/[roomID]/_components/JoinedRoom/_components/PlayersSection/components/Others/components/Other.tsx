'use client'

import { api } from '@/trpc/react'
import Spinner from '@/components/Spinner'
import User from '../../User'

const Other = ({ ID }: Props) => {
  const { data, isLoading } = api.user.getById.useQuery({
    ID,
    config: {
      usernameID: false,
      username: false,
    },
  })

  if (isLoading)
    return (
      <div className="w-full items-center justify-center">
        <Spinner />
      </div>
    )

  if (!data) return null
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
