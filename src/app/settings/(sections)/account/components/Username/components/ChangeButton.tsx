'use client'

import { useMutation } from '@tanstack/react-query'
import { updateUsernameAction } from '../actions/updateUsernameAction'
import clsx from 'clsx'
import { useAtomValue } from 'jotai'
import { inputValueAtom } from './atoms'

const ChangeButton = () => {
  console.log('ChangeButton rendered')
  const inputValue = useAtomValue(inputValueAtom)

  const updateUsername = useMutation({
    mutationFn: () => updateUsernameAction({ newUsername: inputValue! }),
  })

  const buttonText = (() => {
    if (updateUsername.isIdle) return 'Change Username'
    if (updateUsername.isPending) return 'Changing...'
    if (updateUsername.isSuccess) return 'Changed!'
    if (updateUsername.isError) return updateUsername.error.message
  })()

  const handleButtonOnClick = () => {
    updateUsername.mutate()
  }

  return (
    <button
      disabled={updateUsername.isPending}
      onClick={() => handleButtonOnClick()}
      className={clsx(
        'rounded-lg bg-[rgba(255,255,255,0.5)] p-2 font-[500] text-[rgba(0,0,0,0.5)] shadow-[0_5px_10px_-5px_rgba(0,0,0,0.25)] outline-white duration-200',
        {
          'animate-pulse': updateUsername.isPending,
        },
      )}
    >
      {buttonText}
    </button>
  )
}

export default ChangeButton
