import { userInfoIDAtom } from '@/src/app/c/atoms'
import { pusherClient } from '@/src/pusher/client'
import { api } from '@/src/trpc/react'
import { toPusherKey } from '@/utils/toPusherKey'
import { useAtomValue } from 'jotai'
import { Fragment, useEffect, useState } from 'react'
import Message from '../Message'
import { useMessageSound } from './hooks/useMessageSound'

type newMessagesType = {
  time: string
  text: string
  ID: string
  userID: string
  friendID: string
  fromUsernameWithUsernameID: string
  toFriendUsernameWithUsernameID: string
}

const NewMessages = () => {
  const { play, mute } = useMessageSound()
  const [messages, setMessages] = useState<newMessagesType[]>()
  const friendID = useAtomValue(userInfoIDAtom)
  const userID = api.user.getSessionUserID.useQuery(undefined, {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`user:${userID.data}:chat:${friendID}`))

    pusherClient.bind('get_new_message', async (data: newMessagesType) => {
      console.log('binded')
      play()
      if (messages) setMessages([...messages, data])
      if (!messages) setMessages([data])
    })

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${userID.data}:chat:${friendID}`),
      )

      pusherClient.unbind('get_new_message', async (data: newMessagesType) => {
        console.log('unbinded')
        play()
        if (messages) setMessages([...messages, data])
        if (!messages) setMessages([data])
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [friendID, userID])

  return (
    <Fragment>
      {messages
        ? messages.map((message, index) => {
            if (message)
              return (
                <Message
                  fromID={message.userID}
                  toFriendID={message.friendID}
                  fromUsernameWithUsernameID={
                    message.fromUsernameWithUsernameID
                  }
                  toFriendUsernameWithUsernameID={
                    message.toFriendUsernameWithUsernameID
                  }
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
