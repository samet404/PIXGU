'use client'

import spinner from '@/svg/spinner-one-third-svgrepo-com.svg'
import Image from 'next/image'
import { trpc } from '@/_trpc/client'

const loading = () => {
  const users = trpc.getUsers.useQuery()
  console.log(users)

  if (users.error) return <div>{JSON.stringify(users.error)}</div>

  if (users.isSuccess)
    return (
      <div className="flex h-full w-full items-center justify-center bg-black text-white">
        <div>
          {users.data.map((user) => {
            return <div key={user.id}>{user.username}</div>
          })}
        </div>
      </div>
    )
}

export default loading
