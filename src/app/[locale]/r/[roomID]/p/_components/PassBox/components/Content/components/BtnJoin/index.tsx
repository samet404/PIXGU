'use client'

import { api } from '@/trpc/react'
import { useRef, type RefObject } from 'react'
import { clsxMerge } from '@/utils/clsxMerge'
import { Urbanist } from 'next/font/google'
import { usePathname, useRouter } from 'next/navigation'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['700'],
})

type BtnJoinProps = {
  passInputRef: RefObject<HTMLInputElement>
}

const BtnJoin = ({ passInputRef }: BtnJoinProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const roomID = pathname.split('/')[3]!

  const { mutate, error, isLoading, isSuccess } =
    api.gameRoom.knowPass.useMutation({
      onSuccess: () => {
        console.log('PASSWORD IS CORRECT')
        router.push(pathname.replace('/p', ''))
      },
      onError: async (e) => {
        if (e.message === 'ROOM_NOT_FOUND') {
          router.push('/404')
        }
      },
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
      disabled={isLoading || isSuccess || error?.message === 'BLOCKED'}
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
          ? error.message
          : isSuccess
            ? 'Joined!'
            : 'Join'}
    </button>
  )
}
export default BtnJoin
