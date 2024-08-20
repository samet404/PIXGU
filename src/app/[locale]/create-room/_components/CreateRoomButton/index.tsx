'use client'

import { useRouter } from 'next/navigation'
import { api } from '@/trpc/react'
import { Urbanist } from 'next/font/google'
import { useState } from 'react'
import { z } from 'zod'
import type { RouterInputs } from '@/trpc/shared'
import { useCreateRoomInputs } from '@/zustand/store'
import { clsxMerge } from '@/utils/clsxMerge'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['700'],
})

const CreateRoomButton = () => {
  const router = useRouter()
  const [isClientErr, setIsClientErr] = useState(false)

  const { mutate, isLoading, isError, isSuccess } =
    api.gameRoom.create.useMutation({
      onSuccess: (data) => router.push(`/r/${data.createdRoomID}`),
    })

  return (
    <button
      onClick={() => {
        const inputs = useCreateRoomInputs.getState().value

        try {
          z.object({
            name: z.string(),
            password: z.string().optional(),
            isHostPlayer: z.boolean(),
          }).parse(inputs)
        } catch (e) {
          setIsClientErr(true)
        }

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
      {isLoading
        ? 'Creating...'
        : isError || isClientErr
          ? 'Something went wrong'
          : isSuccess
            ? 'Redirecting to room...'
            : 'Create'}
    </button>
  )
}

export default CreateRoomButton
