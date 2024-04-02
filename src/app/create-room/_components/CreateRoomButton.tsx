'use client'

// fix this component later

import { useAtomValue } from 'jotai'
import {
  maxPlayerNumberAtom,
  minPlayerNumberAtom,
  nameAtom,
  passwordAtom,
} from './atoms'
import { api } from '@/trpc/react'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { Inter } from 'next/font/google'

const inter700 = Inter({
  subsets: ['latin'],
  weight: ['700'],
})

const CreateRoomButton = () => {
  const router = useRouter()

  const maxPlayerNumber = useAtomValue(maxPlayerNumberAtom)
  const minPlayerNumber = useAtomValue(minPlayerNumberAtom)
  const password = useAtomValue(passwordAtom)
  const name = useAtomValue(nameAtom)

  const {
    mutate: createRoom,
    isLoading: creatingRoom,
    isSuccess: roomCreated,
    data: latestCreatedRoom,
  } = api.gameRoom.create.useMutation()

  useEffect(() => {
    if (latestCreatedRoom) router.push(`/room/${latestCreatedRoom?.insertedId}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latestCreatedRoom])

  return (
    <button
      type="submit"
      onClick={() => {
        createRoom({
          name: name,
          minPlayers: minPlayerNumber,
          maxPlayers: maxPlayerNumber,
          password: password,
        })
      }}
      disabled={creatingRoom ? true : false}
      className={clsx(
        `${inter700.className} h-full w-full select-none rounded-b-md bg-gradient-to-tr from-[#fff459] to-[#f6ff00] py-3 text-[rgba(0,0,0,0.4)] shadow-[0_0px_10px_5px_rgba(255,255,255,0.3)]`,
        {
          'animate-pulse opacity-50': creatingRoom,
        },
      )}
    >
      {creatingRoom ? 'Creating...' : 'Create'}
    </button>
  )
}

export default CreateRoomButton
