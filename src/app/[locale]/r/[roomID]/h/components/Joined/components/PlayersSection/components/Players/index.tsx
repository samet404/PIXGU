'use client'

import { usePlayers } from '@/zustand/store'
import { Player } from './components/Player'

export const Players = () => {
  const players = usePlayers((s) => s.value.playersArrWithDBInfo)
  return (
    <div className="grid w-full grid-cols-2 gap-5">
      {players.map(
        ({ id, usernameWithUsernameID, profilePicture, isPainter, coin }) => (
          <Player
            key={id}
            ID={id}
            coin={coin}
            usernameWithUsernameID={usernameWithUsernameID}
            profilePicture={profilePicture}
          />
        ),
      )}
    </div>
  )
}
