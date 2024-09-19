'use client'

import { UserPfp } from '@/components/UserPfp'
import { useEffectOnce } from '@/hooks/useEffectOnce'
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
    <div className="flex flex-row justify-start gap-[0.40rem] first:!mt-auto">
      <div className="flex shrink-0 pt-2">
        <UserPfp
          ID={id}
          src={profilePicture}
          width={32}
          height={32}
          alt="pfp"
          // TODO sizes here pls
          sizes="TODO"
          className="flex size-6 flex-shrink-0 rounded-full bg-white"
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="line-clamp-1 text-ellipsis break-all pt-2 text-[0.9rem] leading-3 text-white">
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
