'use client'

import User from './User'
import type {
  User as UserType,
  WebRTCConnData,
} from '@/app/room/[roomID]/_types'
import { myPeerAtom } from '@/app/room/[roomID]/atoms'
import { useAtomValue } from 'jotai'
import { useState } from 'react'

const RenderUsers = () => {
  const myPeer = useAtomValue(myPeerAtom)!
  const [users, setUsers] = useState<UserType[]>([])

  myPeer.on('connection', (conn) => {
    conn.on('data', (connData) => {
      const data = connData as WebRTCConnData

      if (data.type === 'meet') {
        setUsers([...users, data.userInfo])
      }
    })
  })

  return users.map((user, index) => {
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
