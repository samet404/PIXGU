'use client'

import { api } from '@/src/trpc/react'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Btn from './Btn'
import { useMutation } from '@tanstack/react-query'
import { pusher } from './pusher'

const BtnAccept = ({ ID }: { ID: string }) => {
  const accept = api.user.acceptIncomingFriendRequest.useMutation()

  return (
    <Btn
      onClick={() => accept.mutate({ ID: ID})}
      isError={accept.isError}
      isLoading={accept.isLoading}
      isSuccess={accept.isSuccess}
      icon={faPlus}
    />
  )
}
export default BtnAccept
