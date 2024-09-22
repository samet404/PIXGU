'use client'

import { useWhoIsPainterClient, usePlayers } from '@/zustand/store'
import { Img } from './components/Img'

export const User = () => {
  const whoIsPainter = useWhoIsPainterClient.getState().value

  if (whoIsPainter.status === 'thereIsNoPainter') return

  const user = usePlayers.getState().getPlayer(whoIsPainter.painterID)
  if (!user) return

  return (
    <div className="flex animate-fade flex-col items-center">
      <Img src={user.profilePicture} />
      <div className="text-[1rem] font-bold text-violet-500">
        {user.usernameWithUsernameID}
      </div>
    </div>
  )
}
