'use client'

import Image from 'next/image'
import sendIcon from '@/png/icons8-send-24.png'
import { api } from '@/trpc/react'
import { clsxMerge } from '@/utils/clsxMerge'
import { useAtom, useAtomValue } from 'jotai'
import { selectedUserInfoIDAtom } from '@/app/c/atoms'
import { type Ref, type RefObject, forwardRef } from 'react'
import { useMessageSound } from './hooks/useMessageSound'
import { isBtnSendGlowingAtom } from '../../atoms'

type BtnSendProps = {
  inputRef: RefObject<HTMLInputElement>
}

const BtnSend = forwardRef(
  ({ inputRef }: BtnSendProps, ref: Ref<HTMLButtonElement>) => {
    const { play } = useMessageSound()
    const [isGlowing, setIsGlowing] = useAtom(isBtnSendGlowingAtom)
    const { mutate, isLoading, isError } = api.chat.setNewMessage.useMutation()
    const friendID = useAtomValue(selectedUserInfoIDAtom)

    return (
      <button
        ref={ref}
        onClick={() => {
          // play messsage sound
          play()

          const inputVal = inputRef.current?.value
          inputRef.current?.focus()

          console.log('inputVal:', inputVal)
          if (friendID && inputVal && inputVal != '') {
            mutate({
              friend_ID: friendID,
              text: inputVal,
            })

            setIsGlowing(false)
          }
        }}
        className={clsxMerge(
          'flex h-full w-[4rem] items-center justify-center rounded-r-lg bg-gradient-to-br from-[rgba(16,185,129,0.2)] to-emerald-300 opacity-50  duration-200',
          {
            'opacity-100 shadow-[0_0px_30px_10px_rgba(5,252,170,0.3)]':
              isGlowing,
            'bg-gradient-to-br from-[rgba(185,16,72,0.2)] to-pink-600 opacity-50 shadow-[0_0px_30px_10px_rgba(252,5,71,0.465)]':
              isError,
            'hover:shadow-[0_0px_30px_10px_rgba(5,252,170,0.3)]': !isError,
            'aniamte-pulse animate-infinite': isLoading,
          },
        )}
      >
        <Image src={sendIcon} className="size-5 opacity-75" alt="send_icon" />
      </button>
    )
  },
)

BtnSend.displayName = 'BtnSend'

export default BtnSend
