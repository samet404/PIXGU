'use client'

import { usePlayers } from '@/zustand/store/usePlayers'
import { Player } from './components/Player'

export const Players = () => {
  const players = usePlayers((s) => s.value.arr)
  return (
    <div className="grid w-full grid-cols-2 gap-5">
      {players.map(({ id, usernameWithUsernameID, profilePicture }) => {

        return (
          <Player
            key={id}
            ID={id}
            usernameWithUsernameID={usernameWithUsernameID}
            profilePicture={profilePicture ? profilePicture : null}
          />
        )
      })}
    </div>
  )
}
