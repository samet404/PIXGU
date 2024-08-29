'use client'

import { useEffectOnce } from '@/hooks/useEffectOnce'
import { Img } from '../Img'
import { useMyUserInfoForRoomStore } from '@/zustand/provider'

export const MyMsg = ({ msg }: Props) => {
  const { id, usernameWithUsernameID, profilePicture } =
    useMyUserInfoForRoomStore((state) => state.user)

  useEffectOnce(() => {
    const messageList = document.getElementById('guessChatMsgContainer')
    const scrollHeight = messageList!.scrollHeight
    const clientHeight = messageList!.clientHeight

    messageList!.scrollTop = scrollHeight - clientHeight
  })

  return (
    <div className="flex flex-row gap-[0.40rem] first:!mt-auto">
      <div className="pt-2">
        <Img userID={id} pfp={profilePicture} />
      </div>
      <div className="flex w-[90%] flex-col gap-2">
        <div className="pt-2 text-[1rem] leading-3 text-white">
          {usernameWithUsernameID ?? id}
        </div>
        <div className="flex break-all rounded-md bg-gradient-to-r from-[#ffffff5f] to-transparent px-2 py-1 leading-5 text-[#0000006d]">
          {msg}
        </div>
      </div>
    </div>
  )
}

type Props = {
  msg: string
}
