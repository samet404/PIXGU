'use client'

import { usePlayers } from '@/zustand/store'
import Image from 'next/image'

export const Info = () => {
  const players = usePlayers((state) => state.get())

  const playersPlayers = Object.keys(players?.players ?? {}).map((key, i) => {
    const player = players.players[key]!

    if (player.isPainter)
      return (
        <div key={i} className="flex flex-col gap-1 rounded-md bg-[#ffffff31]">
          <div>Painter</div>
          {player.profilePicture && (
            <Image
              width={50}
              height={50}
              src={player.profilePicture}
              sizes="dsapo"
              className="size-7"
              alt="profile_picture"
            />
          )}
          <div>name: {player.usernameWithUsernameID}</div>
          <div>coin: {player.coin}</div>
        </div>
      )

    return (
      <div key={i} className="flex flex-col gap-1 rounded-md bg-[#ffffff31]">
        <div>Player</div>
        {player.profilePicture && (
          <Image
            width={50}
            height={50}
            src={player.profilePicture}
            sizes="dsapo"
            className="size-7"
            alt="profile_picture"
          />
        )}
        <div>name: {player.usernameWithUsernameID}</div>
        <div>coin: {player.coin}</div>
        <div>isGuessed: {player.isGuessed}</div>
      </div>
    )
  })

  return (
    <div className="flex flex-col gap-1 text-[#ffffffd4]">
      <div>count: {players?.count}</div>

      <div className="gap-2">{playersPlayers}</div>
    </div>
  )
}
