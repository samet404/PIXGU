'use client'
import { useAtomValue } from 'jotai'
import {
  maxPlayerNumberAtom,
  minPlayerNumberAtom,
  nameAtom,
  passwordAtom,
} from './atoms'
import { api } from '@/src/trpc/react'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { Inter } from 'next/font/google'

const inter700 = Inter({
  subsets: ['latin'],
  weight: ['700'],
})

const CreateRoomButton = () => {
  const maxPlayerNumber = useAtomValue(maxPlayerNumberAtom)
  const minPlayerNumber = useAtomValue(minPlayerNumberAtom)
  const password = useAtomValue(passwordAtom)
  const name = useAtomValue(nameAtom)

  const router = useRouter()

  const {
    mutate: createRoom,
    isLoading: creatingRoom,
    isSuccess: roomCreated,
  } = api.gameRoom.create.useMutation()

  const latestCreatedRoomId = api.gameRoom.getLatestCreatedRoomId.useQuery(
    undefined,
    {
      enabled: roomCreated,
    },
  )

  useEffect(() => {
    if (latestCreatedRoomId.data)
      router.push(`/room/${latestCreatedRoomId.data[0]?.id}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestCreatedRoomId])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()

        createRoom({
          name: name,
          minPlayers: minPlayerNumber,
          maxPlayers: maxPlayerNumber,
          password: password,
        })
      }}
      className="sticky bottom-0 left-0 w-full leading-4"
    >
      <button
        type="submit"
        disabled={creatingRoom ? true : false}
        className={clsx(
          `${inter700.className} h-full w-full select-none bg-gradient-to-tr from-[#fff459] to-[#f6ff00] py-3 text-[rgba(0,0,0,0.4)] shadow-[0_0px_10px_5px_rgba(255,255,255,0.3)]`,
          {
            'animate-pulse opacity-50': creatingRoom,
          },
        )}
      >
        {creatingRoom ? 'Creating...' : 'Continue'}
      </button>
    </form>
  )
}

export default CreateRoomButton
