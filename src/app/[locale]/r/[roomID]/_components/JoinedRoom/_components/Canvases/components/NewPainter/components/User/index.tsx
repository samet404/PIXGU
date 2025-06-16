'use client'

import { useWhoIsPainterClient } from '@/zustand/store/useWhoIsPainterClient'
import { usePlayers } from '@/zustand/store/usePlayers'
import { UserPfp } from '@/components/UserPfp'

export const User = () => {
  const whoIsPainter = useWhoIsPainterClient.getState().value

  if (whoIsPainter.status === 'thereIsNoPainter') return

  const user = usePlayers.getState().getPlayer(whoIsPainter.painterID!)
  if (!user) return

  const { id, profilePicture, usernameWithUsernameID } = user

  return (
    <div className="flex animate-fade flex-col items-center">
      <UserPfp
        ID={id}
        src={profilePicture}
        className="size-24 rounded-full"
        sizes="dsa"
        width={32}
        height={32}
        alt="pfp"
      />
      <div className="text-[1rem] font-bold text-violet-500">{usernameWithUsernameID}</div>
    </div>
  )
}
