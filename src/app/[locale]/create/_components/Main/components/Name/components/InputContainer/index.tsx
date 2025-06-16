'use client'

import { useSetAtom } from 'jotai'
import { useEffect, useRef, type PropsWithChildren } from 'react'
import { inputInfoTextAtom } from './atoms'
import { useCreateRoomInputs } from '@/zustand/store/useCreateRoomInputs'

type Props = PropsWithChildren<{
  placeholder: string
}>

export const InputContainer = ({ children, placeholder }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const setInputInfoText = useSetAtom(inputInfoTextAtom)
  const value = useCreateRoomInputs((s) => s.name)
  const setValue = useCreateRoomInputs((s) => s.setName)

  const handleOnInput = () => {
    if (!inputRef.current) return

    const inputValue = inputRef.current.value
    if (inputValue.trim() === '') {
      setValue(undefined)
      setInputInfoText('pls enter name >:I')
      return
    }

    if (inputValue && inputValue.length >= 20) {
      setInputInfoText('You reached the maximum length ✨')
      return
    }

    setInputInfoText('Perfect ✨')
    setValue(inputValue)
  }

  useEffect(() => {
    if (value === undefined && inputRef.current) inputRef.current.value = ''
  }, [value])

  return (
    <div className="flex flex-col items-start gap-2 p-2">
      <input
        spellCheck={false}
        maxLength={20}
        onInput={() => handleOnInput()}
        ref={inputRef}
        placeholder={placeholder}
        type="text"
        className="w-full rounded-md bg-[rgba(255,255,255,0.2)] px-[0.40rem] py-1 text-white shadow-lg outline-none placeholder:text-[#ffffff72]"
      />
      {children}
    </div>
  )
}
