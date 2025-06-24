'use client'

import { useAtom } from 'jotai'
import { useRef, type PropsWithChildren } from 'react'
import { roomPasswordAtom } from '../../atoms'

export const Content = ({ children }: PropsWithChildren) => {
  const [password, setPassword] = useAtom(roomPasswordAtom)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const submit = () => {
    if (!inputRef.current) return
    setPassword(inputRef.current.value)
  }

  if (password) return children
  return (
    <div className="flex h-full w-full animate-fade  flex-col items-center justify-center">
      <div className="text-[2rem] font-[700] text-white">Password</div>
      <div className="flex flex-row">
        <input
          ref={inputRef}
          type="text"
          className="bg-[#ffffff92] px-2 py-1"
        />
        <button
          className="bg-[#ffffffb1] px-2 py-1 font-[600]"
          onMouseDown={submit}
        >
          Submit
        </button>
      </div>
    </div>
  )
}
