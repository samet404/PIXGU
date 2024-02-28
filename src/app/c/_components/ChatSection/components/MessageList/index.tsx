'use client'

import { userInfoIDAtom } from '@/src/app/c/atoms'
import { api } from '@/src/trpc/react'
import { useAtomValue } from 'jotai'
import NewMessages from './components/NewMessages'
import Message from './components/Message'
import { useRef } from 'react'

const MessageList = () => {
  const userInfoID = useAtomValue(userInfoIDAtom)
  const prevMessages = api.chat.getPrevChatMessages.useQuery(userInfoID ?? '', {
    enabled: userInfoID ? true : false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })

  return (
    <div
      id="messageList"
      style={{ overflowAnchor: 'auto', overflowY: 'auto' }}
      className="flex gap-4  grow flex-col p-2"
    >
      {prevMessages.data?.map((message, index) => (
        <Message
          fromID={message.fromID}
          toFriendID={message.toFriendID}
          fromUsernameWithUsernameID={message.fromUsernameWithUsernameID}
          toFriendUsernameWithUsernameID={message.toFriendUsernameWithUsernameID}
          text={message.text}
          time={message.time}
          key={index}
        />
      ))}
      <NewMessages />
    </div>
  )
}

export default MessageList
