'use client'

import { selectedUserInfoIDAtom } from '@/app/c/atoms'
import { api } from '@/trpc/react'
import { useAtomValue } from 'jotai'
import Message from '../Message'
import { Fragment } from 'react'

const PrevMessages = () => {
  const selectedUserInfoID = useAtomValue(selectedUserInfoIDAtom)
  const prevMessages = api.chat.getPrevChatMessages.useQuery(
    selectedUserInfoID ?? '',
    {
      enabled: selectedUserInfoID ? true : false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  )

  return (
    <Fragment>
      {prevMessages.data?.map((message, index) => (
        <Message
          fromID={message.fromID}
          toFriendID={message.toFriendID}
          fromUsernameWithUsernameID={message.fromUsernameWithUsernameID}
          toFriendUsernameWithUsernameID={
            message.toFriendUsernameWithUsernameID
          }
          text={message.text}
          time={message.time}
          key={index}
        />
      ))}
    </Fragment>
  )
}
export default PrevMessages
