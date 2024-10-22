'use client'

import { usePlayers } from '@/zustand/store'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { UserPfp } from '@/components/UserPfp'

export const Msg = ({ ID, msg }: Props) => {
  const player = usePlayers((s) => s.getPlayer(ID))
  if (!player) return null

  const isGuest = 'ID' in player
  const name = isGuest ? player?.name : player?.usernameWithUsernameID
  const pfp = isGuest ? null : player?.profilePicture

  useEffectOnce(() => {
    const messageList = document.getElementById('guessChatMsgContainer')
    const scrollHeight = messageList!.scrollHeight
    const clientHeight = messageList!.clientHeight

    messageList!.scrollTop = scrollHeight - clientHeight
  })

  return (
    <div className="flex flex-row justify-start gap-[0.40rem] first:!mt-auto">
      <UserPfp
        ID={ID}
        src={pfp}
        width={32}
        height={32}
        alt="pfp"
        // TODO sizes here pls
        sizes="TODO"
        className="flex-shrink-1 flex size-8 rounded-full border-[0.1rem] border-white bg-white"
      />
      <div className="flex flex-col gap-1">
        <div className="overflow-ellipsis text-[1rem] leading-3 text-white">
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
