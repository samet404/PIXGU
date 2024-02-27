'use client'

import Image from 'next/image'
import sendIcon from '@/png/icons8-send-24.png'
import { api } from '@/src/trpc/react'
import { clsxMerge } from '@/utils/clsxMerge'
import { useAtomValue } from 'jotai'
import { userInfoIDAtom } from '@/src/app/c/atoms'
import { RefObject } from 'react'

type BtnSendProps = {
  inputRef: RefObject<HTMLInputElement>
}

const BtnSend = ({ inputRef }: BtnSendProps) => {
  const inputVal = inputRef.current?.value
  const { mutate, isLoading } = api.chat.setNewMessage.useMutation()
  const friendID = useAtomValue(userInfoIDAtom)

  return (
    <button
      onClick={() => {
        const inputVal = inputRef.current?.value

        console.log('inputVal:', inputVal)
        if (friendID && inputVal && inputVal != '')
          mutate({
            friend_ID: friendID,
            text: inputVal,
          })
      }}
      className={clsxMerge(
        'flex h-full w-[4rem] items-center justify-center rounded-r-lg bg-gradient-to-br from-[rgba(16,185,129,0.2)] to-emerald-300  duration-200 hover:shadow-[0_0px_30px_10px_rgba(5,252,170,0.3)]',
        {
          'opacity-50': inputVal == '',
          'aniamte-pulse animate-infinite': isLoading,
        },
      )}
    >
      <Image src={sendIcon} className="size-5 opacity-75" alt="send_icon" />
    </button>
  )
}
export default BtnSend
