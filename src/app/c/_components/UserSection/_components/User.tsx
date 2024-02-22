'use client'

import Image from 'next/image'
import { Inter_Tight } from 'next/font/google'
import { useSetAtom } from 'jotai'
import { userInfoAtom } from '@/app/c/atoms'
import { setSearchParam } from '@/utils/setSearchParam'
import { api } from '@/src/trpc/react'

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['500'],
})

type UserProps = {
  ID: string
  name: string
  pfp: string | null | undefined
}

const User = ({ ID, name, pfp }: UserProps) => {
  const setUserInfo = useSetAtom(userInfoAtom)
  const { setLatestSpokenUserID } = api.chat.setLatestSpokenUserID.useMutation()

  return (
    <div
      onClick={() => {
        setSearchParam('u', name.replace('@', '-'))
        setUserInfo({ ID, name, pfp })
        setLatestSpokenUserID(ID)
      }}
      className={`${interTight.className} flex w-full animate-fade cursor-pointer flex-col items-start gap-1 transition-all duration-200 ease-in-out first:rounded-t-lg last:rounded-b-lg hover:bg-[#ffffff4f]`}
    >
      <div className="flex w-full flex-row items-center justify-between gap-2 p-2">
        <div className="flex flex-row items-center gap-3">
          {pfp ? (
            <Image
              src={pfp}
              alt="profile_picture"
              width={30}
              height={30}
              className="size-10 rounded-full border-[0.2rem] border-[#ffffff4f] bg-[#ffffffa0] drop-shadow-[0_0px_5px_rgba(0,0,0,0.3)]"
            />
          ) : null}
          <div className="text-md cursor-text select-text rounded-md border-[0.2rem] border-[#ffffffbf] bg-[#00000018] px-2 py-1 text-[#ffffffe5] shadow-[0_0px_10px_1px_rgba(0,0,0,0.2)]">
            {name}
          </div>
        </div>
      </div>
    </div>
  )
}
export default User
