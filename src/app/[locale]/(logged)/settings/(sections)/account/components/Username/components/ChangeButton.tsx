'use client'

import clsx from 'clsx'
import { useAtomValue, useSetAtom } from 'jotai'
import { inputPlaceholderValueAtom, inputValueAtom } from './atoms'
import { api } from '@/trpc/react'

const ChangeButton = () => {
  console.log('ChangeButton rendered')
  const inputValue = useAtomValue(inputValueAtom)
  const setInputPlaceholderValue = useSetAtom(inputPlaceholderValueAtom)

  const { mutate, isSuccess, isIdle, isLoading, isError, error } =
    api.user.setNewUsername.useMutation()

  const buttonText = (() => {
    if (isIdle) return 'Change Username'
    if (isLoading) return 'Changing...'
    if (isSuccess) return 'Changed!'
    if (isError) return `${error.message} | Try again ?`
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

export default ChangeButton
