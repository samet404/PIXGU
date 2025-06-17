'use client'

import { clsxMerge } from '@/utils/clsxMerge'
import { useAtom } from 'jotai'
import { isActiveAtom } from '../atoms'
import { useEffect, type RefObject } from 'react'
import { useRouter } from 'next/navigation'
import Spinner from '@/components/Spinner'
import { useEventListener } from 'usehooks-ts'
import { useMutation } from '@tanstack/react-query'
import { joinAsGuest } from './actions/joinAsGuest'
import { isLoadingAtom } from './atom'

export const Btn = ({ inputRef, joinGame, redirectToRoomID }: Props) => {
  const router = useRouter()
  const [globalLoading, setGlobalLoading] = useAtom(isLoadingAtom)
  const { mutate, isPending, reset } = useMutation({
    mutationFn: joinAsGuest,
    onSuccess: (res) => router.push(res)
  })
  const [isActive, setIsActive] = useAtom(isActiveAtom)

  useEffect(() => {
    return () => {
      reset()
      setIsActive(false)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (inputRef.current) inputRef.current.value = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setGlobalLoading(isPending)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending])

  useEventListener(
    'input',
    () => {
      if (!inputRef?.current) {
        setIsActive(false)
        return
      }

      if (inputRef.current.value.trim() === '') {
        setIsActive(false)
        return
      }

      setIsActive(true)
    },
    inputRef,
  )

  const handleMouseDown = () => {
    if (!inputRef?.current || inputRef.current.value.trim() === '') return

    mutate({
      name: inputRef.current.value,
      joinGame,
      redirectToRoomID
    })
    inputRef.current.value = ''
  }

  return (
    <button
      disabled={isPending || globalLoading}
      onMouseDown={handleMouseDown}
      className={clsxMerge(
        'flex items-center justify-center flex-row gap-2 rounded-md bg-[#ffffff57] shadow-sm px-2 py-1 font-[600] transition-colors duration-300 hover:opacity-60',
        {
          'bg-[#0dd5b7]': isActive,
          'cursor-not-allowed': globalLoading,
          'cursor-wait': isPending,
        },
      )}
    >
      <div>{joinGame ? `Log in and join game` : `Login`}</div>  {isPending && <Spinner className="size-4 drop-shadow-none" />}
    </button>
  )
}

type Props = {
  inputRef: RefObject<HTMLInputElement>
  joinGame: boolean
  redirectToRoomID?: string
}
