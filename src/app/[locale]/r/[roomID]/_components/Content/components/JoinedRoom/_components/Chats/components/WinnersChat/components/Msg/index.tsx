'use client'

import { usePlayers } from '@/zustand/store'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { UserPfp } from '@/components/UserPfp'

export const Msg = ({ ID, msg }: Props) => {
  const player = usePlayers((s) => s.getPlayer(ID))
  const pfp = player?.profilePicture
  const name = player?.usernameWithUsernameID

  useEffectOnce(() => {
    const messageList = document.getElementById('winnersChatMsgContainer')
    const scrollHeight = messageList!.scrollHeight
    const clientHeight = messageList!.clientHeight

    messageList!.scrollTop = scrollHeight - clientHeight
  })

  return (
    <div className="flex flex-row gap-[0.40rem] first:!mt-auto">
      <div className="pt-2">
        <UserPfp
          ID={ID}
          src={pfp}
          width={32}
          height={32}
          alt="pfp"
          // TODO sizes here pls
          sizes="TODO"
          className="flex size-6 flex-shrink-0 rounded-full bg-white"
        />
      </div>
      <div className="flex w-[90%] flex-col gap-2">
        <div className="pt-2 text-[1rem] leading-3 text-white">
          {name ?? ID}
        </div>
        <div className="flex break-all rounded-md bg-gradient-to-r from-[#ffffff5f] to-transparent px-2 py-1 leading-5 text-[#0000006d]">
          {msg}
        </div>
      </div>
    </div>
  )
}

type Props = {
  ID: string
  msg: string
}
