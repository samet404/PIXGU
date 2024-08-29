'use client'

import { useRouter } from 'next/navigation'
import { api } from '@/trpc/react'
import { Urbanist } from 'next/font/google'
import { useRef } from 'react'
import type { RouterInputs } from '@/trpc/shared'
import { useCreateRoomInputs } from '@/zustand/store'
import { clsxMerge } from '@/utils/clsxMerge'
import { useAtomValue } from 'jotai'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['700'],
})

const CreateRoomButton = () => {
  const router = useRouter()

  const { mutate, isLoading, isError, error, isSuccess } =
    api.gameRoom.create.useMutation({
      onSuccess: (data) => router.push(`/r/${data.createdRoomID}/h`),
    })

  const btnText = (() => {
    if (isLoading) return 'Creating...'
    if (isError) {
      if (error.data?.zodError) return 'invalid input'
      else return 'Something went wrong'
    }
    if (isSuccess) return 'Redirecting to room...'
    return 'Create'
  })()

  return (
    <button
      onClick={() => {
        const inputs = useCreateRoomInputs.getState().value
        mutate(inputs as RouterInputs['gameRoom']['create'])
      }}
      disabled={isLoading}
      className={clsxMerge(
        `${urbanist.className} h-full w-full select-none rounded-b-md bg-gradient-to-tr from-[#fff459] to-[#f6ff00] p-1 py-3 text-[1.2rem] text-[rgba(0,0,0,0.4)] shadow-[0_0px_10px_5px_rgba(255,255,255,0.3)] duration-200 focus:opacity-50`,
        {
          'animate-pulse opacity-50': isLoading,
          'from-[#ff7171] to-[#ff8370] opacity-50': isError,
          'animate-pulse from-[#71ff97] to-[#8aff70] opacity-50 animate-infinite':
            isSuccess,
        },
      )}
    >
      {btnText}
    </button>
  )
}

export default CreateRoomButton
