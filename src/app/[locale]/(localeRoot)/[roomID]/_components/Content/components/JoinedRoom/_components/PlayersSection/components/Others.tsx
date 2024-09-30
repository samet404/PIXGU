'use client'

import { usePlayers } from '@/zustand/store'
import User from './User'
import { useUserIDStore } from '@/zustand/provider'

export const Others = () => {
  const myUserID = useUserIDStore((state) => state.userID)
  const playersDbInfos = usePlayers((state) => state.value.arr)

  return playersDbInfos.map(
    ({ id: ID, usernameWithUsernameID, profilePicture }) => {
      if (myUserID !== ID)
        return (
          <User
            key={ID}
            id={ID}
            usernameWithUsernameID={usernameWithUsernameID}
            profilePicture={profilePicture}
          />
        )
    },
  )
}
