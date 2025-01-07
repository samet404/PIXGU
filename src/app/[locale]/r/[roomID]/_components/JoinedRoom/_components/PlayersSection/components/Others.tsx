'use client'

import { usePlayers } from '@/zustand/store'
import User from './User'
import { useUserIDStore } from '@/zustand/provider'

export const Others = () => {
  const myUserID = useUserIDStore((state) => state.userID)
  const playersDbInfos = usePlayers((state) => state.value.arr)

  return playersDbInfos.map(({ id, username, usernameWithUsernameID, profilePicture }) => {

    if (myUserID !== id)
      return (
        <User
          key={id}
          ID={id}
          nameWithNameID={usernameWithUsernameID}
          profilePicture={profilePicture ? profilePicture : null}
        />
      )
  })
}
