import User from './User'
import { getUser } from '@/context/server'

const Me = () => {
  const user = getUser()!

  return (
    <User
      name={user.usernameWithUsernameID}
      profilePicture={user.profilePicture}
    />
  )
}

export default Me
