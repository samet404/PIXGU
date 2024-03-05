'use client'

import { selectedUserInfoIDAtom } from '@/src/app/c/atoms'
import { api } from '@/src/trpc/react'
import { useAtomValue } from 'jotai'
import Message from '../Message'
import { Fragment, Suspense } from 'react'

const PrevMessages = () => {
  const selectedUserInfoID = useAtomValue(selectedUserInfoIDAtom)
  const {
    data: prevMessages,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    fetchPreviousPage,
    isFetchingPreviousPage,
  } = api.chat.getPrevChatMessages.useInfiniteQuery(
    { friendID: selectedUserInfoID },
    {
      enabled: selectedUserInfoID ? true : false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      getPreviousPageParam: (lastPage) => lastPage.nextCursor,
    },
  )

  return (
    <Fragment>
      {prevMessages.data?.map((message, index) => (
        <Suspense key={index} fallback={<>loading...</>}>
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
        </Suspense>
      ))}
    </Fragment>
  )
}
export default PrevMessages
