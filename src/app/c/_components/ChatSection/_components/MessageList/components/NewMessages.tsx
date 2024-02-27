import { userInfoIDAtom } from '@/src/app/c/atoms'
import { pusherClient } from '@/src/pusher/client'
import { api } from '@/src/trpc/react'
import { toPusherKey } from '@/utils/toPusherKey'
import { useAtomValue } from 'jotai'
import { Fragment, useEffect, useRef, useState } from 'react'
import Message from './Message'

const NewMessages = () => {
  const allNewMessages = useRef<
    {
      time: string
      text: string
      ID: string
      userID: string
      friendID: string
    }[]
  >()

  const friendID = useAtomValue(userInfoIDAtom)
  const userID = api.user.getSessionUserID.useQuery(undefined, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })
  const newMessage = api.chat.getNewMessage.useQuery(friendID, {
    enabled: false,
  })

  useEffect(() => {
    if (newMessage.data) {
      if (allNewMessages.current)
        allNewMessages.current = [...allNewMessages.current, newMessage.data]
      if (!allNewMessages.current) allNewMessages.current = [newMessage.data]
    }

    console.log(allNewMessages.current)
  }, [newMessage.data])

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`user:${userID.data}:chat:${friendID}`))

    pusherClient.bind('refetch_new_message', async () => {
      await newMessage.refetch()
    })

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${userID.data}:chat:${friendID}`),
      )
      pusherClient.unbind('refetch_new_message', async () => {
        await newMessage.refetch()
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friendID, userID])

  return (
    <Fragment>
      {allNewMessages.current
        ? allNewMessages.current.map((message, index) => {
            if (message)
              return (
                <Message
                  fromID={message.userID}
                  toFriendID={message.friendID}
                  text={message.text}
                  time={message.time}
                  key={index}
                />
              )
          })
        : null}
    </Fragment>
  )
}
export default NewMessages
