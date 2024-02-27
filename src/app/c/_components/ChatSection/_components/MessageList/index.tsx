'use client'

import { userInfoIDAtom } from '@/src/app/c/atoms'
import { api } from '@/src/trpc/react'
import { useAtomValue } from 'jotai'
import NewMessages from './components/NewMessages'
import { Fragment, useEffect } from 'react'
import Message from './components/Message'

const MessageList = () => {
  const userInfoID = useAtomValue(userInfoIDAtom)
  const prevMessages = api.chat.getPrevChatMessages.useQuery(userInfoID ?? '', {
    enabled: userInfoID ? true : false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  })

  return (
    <Fragment>
      {prevMessages.data?.map((message, index) => (
        <Message
          fromID={message.fromID}
          toFriendID={message.toFriendID}
          text={message.text}
          time={message.time}
          key={index}
        />
      ))}
      <NewMessages />
    </Fragment>
  )
}
export default MessageList
