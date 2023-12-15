'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { Fragment } from 'react'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({
  subsets: ['latin'],
  weight: ['700'],
})

const UserProfile = () => {
  const { data: session } = useSession()
  if (session)
    return (
      <Link href={'api/auth/signout'} className="text-white">
        <div className="flex flex-row items-center gap-2 rounded-3xl bg-[rgba(255,255,255,0.5)] py-[0.2rem] pl-2 pr-[0.2rem]">
          <div className={`${inter.className} text-[rgba(0,0,0,0.5)]`}>
            {session.user!.name}
          </div>
          <Image
            src={session.user!.image!}
            alt="profile picture"
            className="h-10 w-10 rounded-full"
            width={100}
            height={100}
          />
        </div>
      </Link>
    )

  return <Fragment></Fragment>
}

export default UserProfile
