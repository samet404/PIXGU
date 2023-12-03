'use client'

import { useSession } from 'next-auth/react'
import pfp from '@/png/pfp2.png'
import Image from 'next/image'

const UserProfile = () => {
  const { data: session } = useSession()
  if (session)
    return (
      <Image
        src={pfp}
        alt="profile picture"
        className="h-10 w-10 rounded-full"
      />
    )

  return <div className="h-10 w-10 rounded-full bg-[rgba(255,255,255,0.5)]"></div>
}

export default UserProfile
