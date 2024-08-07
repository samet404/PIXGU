'use client'

import User from './User'
import { useContext } from 'react'
import { useRoomPlayersDbInfo } from '@/zustand/store/useRoomPlayersDbInfo'
import { UserIDContext } from '@/context/client'

export const Others = () => {
  const myUserID = useContext(UserIDContext)
  const playersDbInfos = useRoomPlayersDbInfo((s) => s.players)

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
