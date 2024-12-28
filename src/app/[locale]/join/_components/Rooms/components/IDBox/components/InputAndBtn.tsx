'use client'

import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useRouter } from 'next/navigation'
import { Fragment, useRef } from 'react'

export const InputAndBtn = ({ joinText }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const router = useRouter()

  useEffectOnce(() => {
    inputRef.current?.focus()
  })

  const goToRoom = (ID: string) => {
    inputRef.current?.focus()
    router.push(`${window.location.origin}/r/${ID}`)
  }

  return (
    <Fragment>
      <input
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (!buttonRef.current) return
            const ID = inputRef.current?.value
            if (!ID) return

            buttonRef.current.click()

            goToRoom(ID)
          }
        }}
        ref={inputRef}
        type="text"
        placeholder="ID"
        className="flex w-full min-w-0 grow rounded-md bg-[#ffffff34] px-2 py-[0.15rem] placeholder:text-[#ffffff7c]"
      />
      <button
        ref={buttonRef}
        onMouseDown={() => {
          const ID = inputRef.current?.value
          if (!ID) return

          goToRoom(ID)
        }}
        className="flex items-center justify-center rounded-md bg-[#fc56ba] px-2 text-[#ffffffb4]"
      >
        {joinText}
      </button>
    </Fragment>
  )
}

type Props = {
  joinText: string
}
