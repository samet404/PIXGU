'use client'

import { api } from '@/src/trpc/react'
import { Fragment, useEffect } from 'react'
import User from '../User'
import { pusherClient } from '@/pusher/client'

const Content = () => {
  const requests = api.user.getFriendRequests.useQuery()

  useEffect(() => {
    pusherClient.subscribe('incoming_friend_requests')

    pusherClient.bind('refetch_requests', async (data: any) => {
      console.log('triggered')
      alert('OLDU SONUNDA AHH')
      await requests.refetch()
    })

    return () => {
      pusherClient.unbind('incoming_friend_requests', async (data: any) => {
        console.log('triggered')
        await requests.refetch()
      })
      pusherClient.unsubscribe('incoming_friend_requests')
    }
  }, [requests])

  if (requests != undefined)
    if (requests?.data?.length == 0)
      return (
        <div className="whitespace-pre-line text-white">{`There is no friend request here (O_O)`}</div>
      )

  return (
    <Fragment>
      {requests?.data?.map((user, index) => {
        if (user)
          return (
            <User
              ID={user.id}
              name={user.usernameWithUsernameID}
              pfp={user.profilePicture}
              key={index}
            />
          )
      })}
    </Fragment>
  )
}
export default Content
