import { api } from '@/src/trpc/react'
import { clsxMerge } from '@/src/utils/clsxMerge'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { isError } from '@tanstack/react-query'

type BtnAddFriendProps = {
  userID: string
}

const BtnAddFriend = ({ userID }: BtnAddFriendProps) => {
  const sendRequest = api.user.sendFriendRequest.useMutation()

  return (
    <button
      onClick={() => sendRequest.mutate({ ID: userID })}
      className={clsxMerge(
        'flex h-10 w-10 cursor-crosshair items-center justify-center rounded-full bg-[#ffffffb3] p-2 duration-200 hover:opacity-70',
        {
          'animate-spin bg-gradient-to-tr from-transparent to-[#90ffc2ea] animate-once':
            sendRequest.isSuccess,
          'animate-pulse animate-infinite': sendRequest.isLoading,
          'rotate-45 bg-gradient-to-tr from-transparent to-[#ff9090ea]':
            sendRequest.isError,
        },
      )}
      disabled={sendRequest.isLoading}
    >
      <FontAwesomeIcon
        icon={faPlus}
        color={sendRequest.isError ? '#ff5b5bea' : '#3fa5ff'}
        className="flex !h-full w-full duration-200"
      />
    </button>
  )
}

export default BtnAddFriend
