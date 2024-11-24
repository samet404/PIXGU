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

export const Btn = ({ inputRef }: Props) => {
  const { mutate, isLoading, reset } = useMutation({
    mutationFn: joinAsGuest,
  })
  const [isActive, setIsActive] = useAtom(isActiveAtom)
  const router = useRouter()

  useEffect(() => {
    return () => {
      reset()
      if (inputRef.current) inputRef.current.value = ''
    }
  }, [])

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
    })
    inputRef.current.value = ''
  }

  return (
    <button
      disabled={isLoading}
      onMouseDown={handleMouseDown}
      className={clsxMerge(
        'flex w-12 items-center justify-center rounded-md bg-[#ffffff57] p-1 font-[900] duration-300 hover:opacity-60',
        {
          'bg-[#2dd0b8]': isActive,
          'cursor-wait': isLoading,
        },
      )}
    >
      {isLoading ? <Spinner className="size-4 drop-shadow-none" /> : `>`}
    </button>
  )
}

type Props = {
  inputRef: RefObject<HTMLInputElement>
}
