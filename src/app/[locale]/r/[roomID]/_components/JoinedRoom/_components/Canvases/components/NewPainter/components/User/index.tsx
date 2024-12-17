'use client'

import { useWhoIsPainterClient, usePlayers } from '@/zustand/store'
import { UserPfp } from '@/components/UserPfp'

export const User = () => {
  const whoIsPainter = useWhoIsPainterClient.getState().value

  if (whoIsPainter.status === 'thereIsNoPainter') return

  const user = usePlayers.getState().getPlayer(whoIsPainter.painterID!)
  if (!user) return

  const isGuest = 'ID' in user
  const ID = isGuest ? user.ID : user.id
  const name = isGuest ? user.name : user.usernameWithUsernameID
  const pfp = isGuest ? null : user.profilePicture

  return (
    <div className="flex animate-fade flex-col items-center">
      <UserPfp
        ID={ID}
        src={pfp}
        className="size-24 rounded-full"
        sizes="dsa"
        width={32}
        height={32}
        alt="pfp"
      />
      <div className="text-[1rem] font-bold text-violet-500">{name}</div>
    </div>
  )
}
