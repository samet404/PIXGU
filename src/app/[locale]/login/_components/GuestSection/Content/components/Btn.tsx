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

export const Btn = ({ inputRef, joinGame }: Props) => {
  const router = useRouter()
  const [globalLoading, setGlobalLoading] = useAtom(isLoadingAtom)
  const { mutate, isLoading, reset } = useMutation({
    mutationFn: joinAsGuest,
    onSuccess: (res) => router.push(res)

  })
  const [isActive, setIsActive] = useAtom(isActiveAtom)

  useEffect(() => {
    return () => {
      reset()
      setIsActive(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }, [])

  useEffect(() => {
    setGlobalLoading(isLoading)
  }, [isLoading])

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
      joinGame
    })
    inputRef.current.value = ''
  }

  return (
    <button
      disabled={isLoading || globalLoading}
      onMouseDown={handleMouseDown}
      className={clsxMerge(
        'flex items-center justify-center rounded-md bg-[#ffffff57] shadow-sm px-2 py-1 font-[600] transition-colors duration-300 hover:opacity-60',
        {
          'bg-[#0dd5b7]': isActive,
          'cursor-not-allowed': globalLoading,
          'cursor-wait': isLoading,
        },
      )}
    >
      {isLoading ? <Spinner className="size-4 drop-shadow-none" /> : joinGame ? `Login and join game` : `Login`}
    </button>
  )
}

type Props = {
  inputRef: RefObject<HTMLInputElement>
  joinGame: boolean
}
