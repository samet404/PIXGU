'use client'

import { userInfoNameAtom } from '@/app/c/atoms'
import { useAtomValue } from 'jotai'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['600'],
})

const Username = () => {
  const username = useAtomValue(userInfoNameAtom)
  return <div className={`${inter.className} text-[#ffffff75]`}>{username}</div>
}
export default Username
