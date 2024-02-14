'use client'

import { useAtomValue } from 'jotai'
import { usersDataAtom } from '../../atoms'

import User from './components/User'

const Users = () => {
  const usersData = useAtomValue(usersDataAtom)
  console.log('Users rendered')
  console.log(usersData)

  if (usersData)
    return (
      <div className="flex grow flex-col text-white first:rounded-lg ">
        {usersData
          ? usersData.map((user, index) => {
              return (
                <User
                  key={index}
                  ID={user.id}
                  name={user.usernameWithUsernameID}
                  pfp={user.profilePicture}
                />
              )
            })
          : null}
      </div>
    )
}

export default Users
