'use client'

import { useSession } from 'next-auth/react'
import pfp from '@/png/pfp2.png'
import Image from 'next/image'
import { Fragment } from 'react'

const UserProfile = () => {
  const { data: session } = useSession()
  if (session)
    return (
      <div className="flex flex-row justify-center gap-2 rounded-md bg-[rgba(255,255,255,0.5)] p-1">
        <div>{session.user!.name}</div>
        <Image
          src={session.user!.image!}
          alt="profile picture"
          className="h-10 w-10 rounded-full"
        />
      </div>
    )

  return <Fragment></Fragment>
}

export default UserProfile
