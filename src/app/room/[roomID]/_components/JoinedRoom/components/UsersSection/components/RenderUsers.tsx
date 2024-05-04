'use client'

import { playersAtom } from '@/app/room/[roomID]/atoms'
import { useAtomValue } from 'jotai'
import dynamic from 'next/dynamic'

const User = dynamic(() => import('./User'))

const RenderUsers = () => {
  const players = useAtomValue(playersAtom)

  if (!players) return null

  return players.map((user, index) => {
    return (
      <User
        key={index}
        name={user.usernameWithUsernameID}
        profilePicture={user.profilePicture}
      />
    )
  })
}
export default RenderUsers
