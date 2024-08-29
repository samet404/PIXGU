'use client'

import { useWhoIsPainterClient, usePlayers } from '@/zustand/store'
import { Img } from './components/Img'

export const User = () => {
  const whoIsPainter = useWhoIsPainterClient.getState().value

  if (whoIsPainter.status === 'thereIsNoPainter') return

  const user = usePlayers.getState().getPlayer(whoIsPainter.painterID)
  if (!user) return

  return (
    <div className="flex flex-col items-center">
      <Img src={user.profilePicture} />
      <div className="text-[2rem] font-bold text-violet-500">
        {user.usernameWithUsernameID}
      </div>
    </div>
  )
}
