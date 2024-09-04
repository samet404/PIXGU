'use client'

import { selectedUserInfoNameAtom } from '@/app/c/atoms'
import { useAtomValue } from 'jotai'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['600'],
})

const Username = () => {
  const username = useAtomValue(selectedUserInfoNameAtom)

  if (!username)
    return (
      <div className={`h-4 w-28 animate-pulse rounded-md bg-[#ffffff1e]`}>
        {username}
      </div>
    )

  return (
    <div className={`${inter.className} animate-fade text-[#ffffff75]`}>
      {username}
    </div>
  )
}
export default Username
