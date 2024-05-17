'use client'

import { selectedUserInfoAtom } from '@/app/c/atoms'
import { useAtomValue } from 'jotai'

const Blur = () => {
  const selectedUserInfo = useAtomValue(selectedUserInfoAtom)

  if (!selectedUserInfo) return null
  if (!selectedUserInfo.isFriend)
    return (
      <div className="absolute z-20 flex h-full w-full items-center justify-center rounded-lg text-white backdrop-blur-xl">
        {selectedUserInfo?.pfp ? <></> : null}
        {selectedUserInfo?.name
          ? `You need to be friend with ${selectedUserInfo.name} to talk`
          : null}
      </div>
    )
}
export default Blur
