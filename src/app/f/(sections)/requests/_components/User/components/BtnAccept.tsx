'use client'

import { api } from '@/src/trpc/react'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Btn from './Btn'

type BtnAcceptProps = {
  ID: string
  usernameWithUsernameID: string
}

const BtnAccept = ({ ID, usernameWithUsernameID }: BtnAcceptProps) => {
  const accept = api.user.acceptIncomingFriendRequest.useMutation()

  return (
    <Btn
      onClick={() =>
        accept.mutate({
          ID: ID,
          friendUsernameWithUsernameID: usernameWithUsernameID,
        })
      }
      isError={accept.isError}
      isLoading={accept.isLoading}
      isSuccess={accept.isSuccess}
      icon={faPlus}
    />
  )
}
export default BtnAccept
