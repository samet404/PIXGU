'use client'

import { api } from '@/src/trpc/react'
import { faBan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const BtnBlock = ({
  ID,
  usernameWithUsernameID,
}: {
  ID: string
  usernameWithUsernameID: string
}) => {
  const accept = api.user.acceptIncomingFriendRequest.useMutation()

  return (
    <button
      onClick={() =>
        accept.mutate({
          ID: ID,
          friendUsernameWithUsernameID: usernameWithUsernameID,
        })
      }
      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffffff7e] p-2 duration-150 hover:bg-[#ffffffba]"
    >
      <FontAwesomeIcon
        icon={faBan}
        color="#2d9dff"
        className="!h-full w-full"
      />
    </button>
  )
}
export default BtnBlock
