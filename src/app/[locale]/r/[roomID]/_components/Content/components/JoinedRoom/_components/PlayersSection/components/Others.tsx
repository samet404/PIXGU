'use client'

import { usePlayers } from '@/zustand/store'
import User from './User'
import { useUserIDStore } from '@/zustand/provider'

export const Others = () => {
  const myUserID = useUserIDStore((state) => state.userID)
  const playersDbInfos = usePlayers((state) => state.getPlayersDbInfosArr())

  return playersDbInfos.map((user) => {
    if (myUserID !== user.ID)
      return (
        <User
          key={user.ID}
          name={user.usernameWithUsernameID}
          profilePicture={user.profilePicture}
        />
      )
  })
}
