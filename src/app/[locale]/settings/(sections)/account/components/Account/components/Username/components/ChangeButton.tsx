'use client'

import clsx from 'clsx'
import { useAtomValue, useSetAtom } from 'jotai'
import { inputPlaceholderValueAtom, inputValueAtom } from './atoms'
import { api } from '@/trpc/react'
import type { LangObj } from '../../../lang'

export const ChangeButton = ({ error, idle, loading, success }: Props) => {
  console.log('ChangeButton rendered')
  const inputValue = useAtomValue(inputValueAtom)
  const setInputPlaceholderValue = useSetAtom(inputPlaceholderValueAtom)

  const { mutate, isSuccess, isIdle, isLoading, isError, error: apiError } =
    api.user.setNewUsername.useMutation()

  const buttonText = (() => {
    if (isIdle) return idle
    if (isLoading) return loading
    if (isSuccess) return success
    if (isError) return `${apiError.message} |  ${error}`
  })()

  const handleOnClick = () => {
    if (inputValue) {
      mutate({ newUsername: inputValue })
      setInputPlaceholderValue(inputValue)
    }
  }

  return (
    <button
      disabled={isLoading}
      onClick={handleOnClick}
      className={clsx(
        'rounded-lg bg-[rgba(255,255,255,0.5)] p-2 font-[500] text-[rgba(0,0,0,0.5)] shadow-[0_5px_10px_-5px_rgba(0,0,0,0.25)] outline-white duration-200',
        {
          'animate-pulse': isLoading,
        },
      )}
    >
      {buttonText}
    </button>
  )
}


type Props = LangObj['username']['buttonText']
