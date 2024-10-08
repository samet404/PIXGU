'use client'

import { api } from '@/trpc/react'
import { Urbanist } from 'next/font/google'
import { useCreateRoomInputs } from '@/zustand/store'
import { clsxMerge } from '@/utils/clsxMerge'
import { useEffect, useRef, type RefObject } from 'react'
import { useAtomValue } from 'jotai'
import { createdRoomsCountAtom } from '../atoms'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['700'],
})

const CreateRoomButton = ({ createdRoomsRef }: Props) => {
  const createdRoomsCount = useAtomValue(createdRoomsCountAtom)
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { mutateAsync, isLoading, reset, isError, error, isSuccess } =
    api.gameRoom.create.useMutation({
      onSuccess: () => {
        createdRoomsRef.current?.refetch()
        useCreateRoomInputs.getState().reset()
      },
    })

  useEffect(() => {
    if (isSuccess || isError) resetTimeoutRef.current = setTimeout(reset, 3000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError])

  const name = useCreateRoomInputs((s) => s.name)
  const password = useCreateRoomInputs((s) => s.password)

  const btnText = (() => {
    if (isLoading) return 'Creating...'
    if (isError) {
      if (error.data?.zodError) return 'invalid input'
      else return 'Something went wrong'
    }
    if (isSuccess) return 'Created'
    return 'Create'
  })()

  const handleClick = async () => {
    const resetTimeout = resetTimeoutRef.current
    if (resetTimeout) clearTimeout(resetTimeout)

    if (name) {
      await mutateAsync({
        name,
        password: password ? password : undefined,
      })
    }
  }

  console.log(createdRoomsCount)
  return (
    <button
      onClick={handleClick}
      disabled={isLoading || !name || createdRoomsCount === 4}
      className={clsxMerge(
        `${urbanist.className} h-full w-full select-none rounded-b-md bg-gradient-to-tr from-[#fff459] to-[#f6ff00] p-1 py-3 text-[1.2rem] text-[rgba(0,0,0,0.4)] shadow-[0_0px_10px_5px_rgba(255,255,255,0.3)] duration-200 focus:opacity-50 disabled:cursor-not-allowed disabled:opacity-50`,
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

type Props = {
  createdRoomsRef: RefObject<{
    refetch: () => void
  }>
}
