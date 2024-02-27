'use client'

import { Inter } from 'next/font/google'
import Image from 'next/image'
// import BtnAddFriend from './components/BtnAddFriend'
import { api } from '@/src/trpc/react'
import BtnDecline from './components/BtnDecline'
import BtnAccept from './components/BtnAccept'
import BtnBlock from './components/BtnBlock'
import { pusherServer } from '@/src/pusher/server'

const inter = Inter({
  subsets: ['latin'],
  weight: ['500'],
})

type UserProps = {
  ID: string
  name: string
  pfp: string | null
}

const User = ({ ID, name, pfp }: UserProps) => {
  const session = api.user.getSession.useQuery()

  return (
    <div
      className={`${inter.className} flex w-full animate-fade flex-col items-start gap-1 bg-[#3fa5ff] first:rounded-t-lg last:rounded-b-lg hover:bg-gradient-to-r hover:from-[#ffffff46] hover:to-transparent`}
    >
      <div className="flex w-full flex-row items-center justify-between gap-2 p-2">
        <div className="flex flex-row items-center gap-3">
          {pfp ? (
            <Image
              src={pfp}
              alt="profile_picture"
              width={50}
              height={50}
              className="h-12 w-12 rounded-full border-[0.2rem] border-[#ffffff4f] bg-[#ffffffa0] drop-shadow-[0_0px_5px_rgba(0,0,0,0.3)]"
            />
          ) : null}
          <div className="cursor-text select-text text-[#ffffffdd] drop-shadow-[0_0px_2px_rgba(0,0,0,0.5)]">
            {name}
          </div>
        </div>
        <div className="flex flex-row gap-1">
          <BtnBlock ID={ID} usernameWithUsernameID={name} />
          <BtnDecline ID={ID} />
          <BtnAccept ID={ID} usernameWithUsernameID={name} />
        </div>
      </div>

      {session.data?.user?.usernameWithUsernameID == name ? (
        <div className="flex w-full rounded-md bg-yellow-400 p-2 text-[#fffffff5] drop-shadow-[0_0px_3px_rgba(0,0,0,0.2)]">
          <div className="cursor-text select-text text-sm text-[#ffffffee] drop-shadow-[0_0px_4px_rgba(0,0,0,0.6)]">
            {`(< O-O)>!? Bu sensin`}
          </div>
        </div>
      ) : null}
    </div>
  )
}
export default User
