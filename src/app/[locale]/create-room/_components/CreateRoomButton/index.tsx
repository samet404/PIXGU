'use client'

import {
  maxPlayerNumberAtom,
  minPlayerNumberAtom,
  nameAtom,
  passwordAtom,
} from '../atoms'
import { useAtomValue } from 'jotai'
import { useRouter } from 'next/navigation'
import { api } from '@/trpc/react'
import clsx from 'clsx'
import { Urbanist } from 'next/font/google'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['700'],
})

const CreateRoomButton = () => {
  const router = useRouter()

  const password = useAtomValue(passwordAtom)
  const name = useAtomValue(nameAtom)

  const { mutate, isLoading, isError } = api.gameRoom.create.useMutation({
    onSuccess: (data) => router.push(`/r/${data.createdRoomID}`),
  })

  return (
    <button
      onClick={() =>
        mutate({
          name: name,
          password: password,
        })
      }
      disabled={isLoading}
      className={clsx(
        `${urbanist.className} h-full w-full select-none rounded-b-md bg-gradient-to-tr from-[#fff459] to-[#f6ff00] p-1 py-3 text-[1.2rem] text-[rgba(0,0,0,0.4)] shadow-[0_0px_10px_5px_rgba(255,255,255,0.3)] duration-200 focus:opacity-50`,
        {
          'animate-pulse opacity-50': isLoading,
          'from-[#ff7171] to-[#ff8370] text-[0.5rem] opacity-50': isError,
        },
      )}
    >
      {isLoading ? 'Creating...' : isError ? 'Something went wrong' : 'Create'}
    </button>
  )
}

export default CreateRoomButton
