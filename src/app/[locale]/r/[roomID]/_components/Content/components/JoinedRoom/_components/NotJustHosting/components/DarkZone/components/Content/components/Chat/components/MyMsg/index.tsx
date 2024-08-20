'use client'

import { Img } from '../Img'
import { useMyUserInfoForRoomStore } from '@/zustand/provider'

export const MyMsg = ({ msg }: Props) => {
  const { id, usernameWithUsernameID, profilePicture } =
    useMyUserInfoForRoomStore((state) => state.user)

  return (
    <div className="flex flex-row gap-[0.40rem]">
      <div className="pt-2">
        <Img userID={id} pfp={profilePicture} />
      </div>
      <div className="flex w-[90%] flex-col gap-2">
        <div className="pt-2 text-[1rem] leading-3 text-white">
          {usernameWithUsernameID ?? id}
        </div>
        <div className="flex break-all rounded-md bg-gradient-to-r from-[#ffffff5f] to-transparent px-2 py-1 leading-5 text-[#000000c4]">
          {msg}
        </div>
      </div>
    </div>
  )
}

type Props = {
  msg: string
}
