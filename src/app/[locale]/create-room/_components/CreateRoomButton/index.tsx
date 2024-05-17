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
import Btn from './components/Btn'

const CreateRoomButton = () => {
  const router = useRouter()

  const maxPlayerNumber = useAtomValue(maxPlayerNumberAtom)
  const minPlayerNumber = useAtomValue(minPlayerNumberAtom)
  const password = useAtomValue(passwordAtom)
  const name = useAtomValue(nameAtom)

  const { mutate: createRoom, isLoading: creatingRoom } =
    api.gameRoom.create.useMutation({
      onSuccess: (data) => router.push(`/r/${data.createdRoomID}`),
    })

  return (
    <Btn
      onClick={() =>
        createRoom({
          name: name,
          minPlayers: minPlayerNumber,
          maxPlayers: maxPlayerNumber,
          password: password,
        })
      }
      loading={creatingRoom}
    />
  )
}

export default CreateRoomButton
