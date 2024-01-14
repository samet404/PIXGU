'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'

const UserProfile = () => {
  const user = trpc.getLoggedUser.useQuery()

  if (userData.isError)
    return (
      <button>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-400 text-white">
          Err
        </div>
      </button>
    )
  if (userData.isSuccess) console.log(userData.data)
  return (
    <Link
      href={`/user/${userData.data.session.username}@${userData.data.usernameId[0].id}`}
      className="h-12 w-12 rounded-full border-[0.3rem] border-[white] drop-shadow-[0_0px_3px_rgba(0,0,0,0.2)] duration-100 hover:opacity-60"
    >
      <Image
        src={userData.data.session.profilePicture}
        alt="Profile picture"
        width={66}
        height={66}
        sizes="sa"
        className=" select-none  rounded-full bg-gray-400"
      />
    </Link>
  )
}

export default UserProfile
