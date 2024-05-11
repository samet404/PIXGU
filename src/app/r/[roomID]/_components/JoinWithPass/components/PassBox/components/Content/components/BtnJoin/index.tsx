'use client'

import { api } from '@/trpc/react'
import { type RefObject } from 'react'
import { clsxMerge } from '@/utils/clsxMerge'
import { useSetAtom } from 'jotai'
import { isPassTrueAtom } from '@/app/r/[roomID]/_components/JoinWithPass/atoms'
import { Urbanist } from 'next/font/google'
import { useLastPartOfPathname } from '@/hooks'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['700'],
})

type BtnJoinProps = {
  passInputRef: RefObject<HTMLInputElement>
}

const BtnJoin = ({ passInputRef }: BtnJoinProps) => {
  const roomID = useLastPartOfPathname()
  const setIsPassTrue = useSetAtom(isPassTrueAtom)

  const { mutate, error, isLoading, isSuccess } =
    api.gameRoom.joinWithPass.useMutation({
      onSuccess: () => setIsPassTrue(true),
    })

  const handleOnClick = () => {
    const pass = passInputRef.current?.value
    if (!pass) return null

    console.log('pass:', pass)
    console.log('roomID:', roomID)
    mutate({
      pass: pass,
      roomID: roomID,
    })
  }

  return (
    <button
      onClick={() => handleOnClick()}
      className={clsxMerge(
        `${urbanist.className} rounded-md bg-[#ffffffaa] px-2 py-1 text-[1.2rem] font-[700] text-[#00000060] shadow-[0_0px_10px_1px_rgba(0,0,0,0.15)] duration-150 duration-300`,
        {
          'animate-pulse': isLoading,
          'bg-rose-200': error,
          'bg-green-200': isSuccess,
        },
      )}
    >
      {isLoading
        ? 'Joining...'
        : error
          ? 'Wrong Password'
          : isSuccess
            ? 'Joined!'
            : 'Join'}
    </button>
  )
}
export default BtnJoin
