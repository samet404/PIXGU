'use client'

import { usePlayers } from '@/zustand/store'
import { Img } from '../Img'

export const Msg = ({ ID, msg }: Props) => {
  const playersDbInfos = usePlayers((state) => state.getPlayersDbInfos())
  const pfp = playersDbInfos[ID]?.profilePicture
  const name = playersDbInfos[ID]?.usernameWithUsernameID

  return (
    <div className="flex flex-row gap-[0.40rem]">
      <div className="pt-2">
        <Img userID={ID} pfp={pfp} />
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
