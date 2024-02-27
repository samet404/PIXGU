'use client'

import { api } from '@/src/trpc/react'
import { useEffect } from 'react'
import { pusherClient } from '@/pusher/client'
import { toPusherKey } from '@/utils/toPusherKey'
import NoRequest from './_components/NoRequest'
import User from '../User'

const Content = () => {
  const requests = api.user.getFriendRequests.useQuery()
  const userID = api.user.getSessionUserID.useQuery()

  useEffect(() => {
    pusherClient.subscribe(
      toPusherKey(`incoming_friend_requests:${userID.data}`),
    )

    pusherClient.bind('refetch_requests', async () => {
      await requests.refetch()
    })

    return () => {
      pusherClient.unbind('refetch_requests', async () => {
        await requests.refetch()
      })
      pusherClient.unsubscribe(
        toPusherKey(`incoming_friend_requests:${userID.data}`),
      )
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!requests.data) return <NoRequest />
  return (
    <section>
      <div className="flex animate-fade flex-col gap-2 rounded-md bg-gradient-to-br from-[#0574d5] to-[#006cb3cd] p-2 shadow-[0_0px_60px_5px_rgba(0,0,0,0.6)] xxs:w-full md:w-[27rem]">
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
      </div>
    </section>
  )
}
export default Content
