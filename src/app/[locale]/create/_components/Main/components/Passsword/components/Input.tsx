'use client'

import { useCreateRoomInputs } from '@/zustand/store'
import { useSetAtom } from 'jotai'
import { useEffect, useRef, type PropsWithChildren } from 'react'
import { inputInfoTextAtom, isPublicAtom } from '../atoms'
import { GeneratePassBtn } from './GeneratePassBtn'

type Props = PropsWithChildren<{
  placeholder: string
  generateBtnText: string
}>

export const InputContainer = ({ children, placeholder, generateBtnText }: Props) => {
  const setInputInfoText = useSetAtom(inputInfoTextAtom)
  const setIsPublic = useSetAtom(isPublicAtom)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const value = useCreateRoomInputs((s) => s.password)
  const setValue = useCreateRoomInputs((s) => s.setPass)

  useEffect(() => {
    if (value === undefined && inputRef.current) inputRef.current.value = ''
  }, [value])

  const handleOnInput = () => {
    if (!inputRef.current) return

    const inputValue = inputRef.current.value
    if (inputValue.trim() === '') {
      setValue(undefined)
      setIsPublic(true)
      setInputInfoText('Looks good ✨')
      return
    }

    setIsPublic(false)
    if (inputValue && inputValue.length >= 50) {
      setInputInfoText('You reached maximum length ✨')
      return
    }

    setInputInfoText('Looks good ✨')
    setValue(inputValue)
  }


  return (
    <div className="flex flex-col items-start gap-2 p-2">
      <input
        spellCheck={false}
        maxLength={50}
        onInput={() => handleOnInput()}
        ref={inputRef}
        placeholder={placeholder}
        className="w-full rounded-md bg-[rgba(255,255,255,0.2)] px-[0.40rem] py-1 text-white shadow-lg outline-none placeholder:text-[#ffffff72]"
      />
      <div className="flex flex-row items-center gap-1">
        <GeneratePassBtn displayText={generateBtnText} inputRef={inputRef} />
        {children}
      </div>
    </div>
  )
}

