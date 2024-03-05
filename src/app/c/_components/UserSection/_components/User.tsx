'use client'

import Image from 'next/image'
import { Inter_Tight } from 'next/font/google'
import { useSetAtom } from 'jotai'
import { selectedUserInfoAtom } from '@/app/c/atoms'
import { setSearchParam } from '@/utils/setSearchParam'
import { api } from '@/src/trpc/react'
import Link from 'next/link'
import { useRef } from 'react'
import { getSearchParam } from '@/utils/getSearchParam'
import { truncateStr } from '@/utils/truncateStr'

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
  const setSelectedUserInfo = useSetAtom(selectedUserInfoAtom)
  const setLatestSpokenUser = api.chat.setLatestSpokenUser.useMutation()

  const handleOnClick = (e: any) => {
    const target = e.target as HTMLElement

    if (target.tagName !== 'A') {
      const searchParamU = getSearchParam('u')

      if (searchParamU !== name.replace('@', '-')) {
        setSearchParam('u', name.replace('@', '-'))

        setSelectedUserInfo({
          ID: ID,
          name: name,
          pfp: pfp,
          isFriend: true,
        })

        setLatestSpokenUser.mutate(ID)
      }
    }
  }

  return (
    <div
      onClick={handleOnClick}
      className={`${interTight.className} z-10 flex w-full animate-fade cursor-pointer flex-col items-start gap-1 transition-all duration-200 ease-in-out first:rounded-t-lg last:rounded-b-lg hover:bg-[#0000003a]`}
    >
      <div className="flex w-full flex-row items-center justify-between gap-2 p-2">
        <div className="flex flex-row items-center gap-2">
          {pfp ? (
            <Link href={`/u/${name}`} className="z-20">
              <Image
                src={pfp}
                alt="profile_picture"
                width={50}
                height={50}
                sizes="calc(0.81vw + 33px)"
                className="cursor-zoom-in rounded-full border-[0.15rem] border-[#565656]  drop-shadow-[0_0px_5px_rgba(0,0,0,0.3)]"
              />
            </Link>
          ) : null}
          <div className="select-text rounded-md bg-[rgba(0,0,0,0.08)] px-2 py-1 text-[0.9rem] text-[#ffffff77]">
            {truncateStr(name, 12)}
          </div>
        </div>
      </div>
    </div>
  )
}
export default User
