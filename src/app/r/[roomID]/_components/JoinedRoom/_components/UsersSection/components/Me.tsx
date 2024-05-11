'use client'

import { useAtomValue } from 'jotai'
import User from './User'
import { userAtom } from '@/'

const Me = () => {
  const user = useAtomValue(userAtom)!

  return (
    <User
      name={user.usernameWithUsernameID}
      profilePicture={user.profilePicture}
    />
  )
}

export default Me
