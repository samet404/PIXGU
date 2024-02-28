'use client'

import {userInfoAtom } from '@/app/c/atoms'
import { useAtomValue } from 'jotai'

const Blur = () => {
  const userInfo = useAtomValue(userInfoAtom)

  if (!userInfo) return null
  if (!userInfo.isFriend)
    return (
      <div className="absolute z-20 flex h-full w-full items-center justify-center rounded-lg text-white backdrop-blur-xl">
        {userInfo?.pfp ? <></> : null}
        {userInfo?.name
          ? `You need to be friend with ${userInfo.name} to talk`
          : null}
      </div>
    )
}
export default Blur
