'use client'

import { usePlayers } from '@/zustand/store'
import User from './User'
import { useUserIDStore } from '@/zustand/provider'

export const Others = () => {
  const myUserID = useUserIDStore((state) => state.userID)
  const playersDbInfos = usePlayers((state) => state.value.arr)

  return playersDbInfos.map((p) => {
    const isGuest = 'ID' in p
    const ID = isGuest ? p.ID : p.id
    const usernameWithUsernameID = isGuest
      ? p.nameWithNameID
      : p.usernameWithUsernameID
    const profilePicture = isGuest ? null : p.profilePicture

    console.log(p)

    if (myUserID !== ID)
      return (
        <User
          key={ID}
          ID={ID}
          nameWithNameID={usernameWithUsernameID}
          profilePicture={profilePicture}
        />
      )
  })
}
