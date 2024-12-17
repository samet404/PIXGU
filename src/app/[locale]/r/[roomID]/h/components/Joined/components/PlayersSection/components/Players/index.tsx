'use client'

import { usePlayers } from '@/zustand/store'
import { Player } from './components/Player'

export const Players = () => {
  const players = usePlayers((s) => s.value.arr)
  return (
    <div className="grid w-full grid-cols-2 gap-5">
      {players.map((p) => {
        const isGuest = 'ID' in p
        const ID = isGuest ? p.ID : p.id
        const name = isGuest ? p.name : p.usernameWithUsernameID
        const pfp = isGuest ? null : p.profilePicture

        return (
          <Player
            key={ID}
            ID={ID}
            usernameWithUsernameID={name}
            profilePicture={pfp}
          />
        )
      })}
    </div>
  )
}
