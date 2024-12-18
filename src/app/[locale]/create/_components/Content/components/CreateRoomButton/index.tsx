'use client'

import { Urbanist } from 'next/font/google'
import { useCreateRoomInputs, useSocketIO } from '@/zustand/store'
import { clsxMerge } from '@/utils/clsxMerge'
import { useEffect, useRef, useState, type RefObject } from 'react'
import { useAtomValue } from 'jotai'
import { createdRoomsCountAtom } from '../atoms'
import { useEffectOnce } from '@/hooks/useEffectOnce'

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['700'],
})

const CreateRoomButton = ({ createdRoomsRef }: Props) => {
  const createdRoomsCount = useAtomValue(createdRoomsCountAtom)
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [status, setStatus] = useState<{
    isLoading: boolean
    error: string | null
    isSuccess: boolean | null
  }>({
    isLoading: false,
    error: null,
    isSuccess: null,
  })

  const { error, isLoading, isSuccess } = status
  const io = useSocketIO((s) => s.io)!

  const reset = () => {
    setStatus({
      error: null,
      isLoading: false,
      isSuccess: false,
    })
  }

  useEffectOnce(() => {
    io.on('cr-error', (err) => {
      resetTimeoutRef.current = setTimeout(reset, 3000)
    })

    io.on('cr-success', (roomID: string) => {
      setStatus({
        error: null,
        isLoading: false,
        isSuccess: true,
      })
      createdRoomsRef?.current?.refetch()
    })

    io.on(
      'cr-error',
      (
        e:
          | 'REACHED_MAX_ROOMS'
          | 'GEOLOCATION_INFORMATION_NOT_FOUND'
          | 'INTERNAL_SERVER_ERROR',
      ) => {
        console.error(e)
        useCreateRoomInputs.getState().reset()
        setStatus({
          error: e,
          isLoading: false,
          isSuccess: false,
        })
      },
    )
  })

  useEffect(() => {
    resetTimeoutRef.current = setTimeout(reset, 3000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status.error])

  const name = useCreateRoomInputs((s) => s.name)
  const password = useCreateRoomInputs((s) => s.password)

  const btnText = (() => {
    if (isLoading) return 'Creating...'
    if (error) return 'Something went wrong'
    if (isSuccess) return 'Created'
    return 'Create'
  })()

  const handleClick = () => {
    const resetTimeout = resetTimeoutRef.current
    if (resetTimeout) clearTimeout(resetTimeout)
    if (!name) return
    if (!io) return

    setStatus({
      error: null,
      isLoading: true,
      isSuccess: null,
    })

    io.emit('cr', {
      name,
      password,
    })
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
          'from-[#ff7171] to-[#ff8370] opacity-50': error,
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
