'use client'

import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useCreateRoomInputs } from '@/zustand/store'
import { createId } from '@paralleldrive/cuid2'
import { useSetAtom } from 'jotai'
import { useEffect, useRef, type PropsWithChildren } from 'react'
import { inputInfoTextAtom, isPublicAtom } from '../atoms'

const InputContainer = ({ children }: PropsWithChildren) => {
  const setInputInfoText = useSetAtom(inputInfoTextAtom)
  const setIsPublic = useSetAtom(isPublicAtom)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const copyDivRef = useRef<HTMLDivElement | null>(null)
  const value = useCreateRoomInputs((s) => s.password)
  const setValue = useCreateRoomInputs((s) => s.setPass)

  useEffectOnce(() => {
    copyDivRef.current = document.createElement('div')
  })

  useEffect(() => {
    if (value === undefined && inputRef.current) inputRef.current.value = ''
  }, [value])

  const handleOnInput = () => {
    if (!inputRef.current) return

    const inputValue = inputRef.current.value
    if (inputValue.trim() === '') {
      setValue(undefined)
      setIsPublic(true)
      setInputInfoText(null)
      return
    }

    setIsPublic(false)
    if (inputValue && inputValue.length >= 50) {
      setInputInfoText('You reached maximum length ✨')
      return
    }

    setInputInfoText('Good ✨')
    setValue(inputValue)
  }

  const generatePassword = async () => {
    if (!inputRef.current?.value || !copyDivRef.current) return

    const pass = createId()
    copyDivRef.current.textContent = pass
    await navigator.clipboard.writeText(copyDivRef.current.textContent)

    setIsPublic(false)
    inputRef.current.value = pass
    setValue(pass)
  }

  return (
    <div className="flex flex-col items-start gap-2 p-2">
      <input
        spellCheck={false}
        maxLength={50}
        onInput={() => handleOnInput()}
        ref={inputRef}
        placeholder={'If you want a private room'}
        type="password"
        className="w-full rounded-md bg-[rgba(255,255,255,0.2)] px-[0.40rem] py-1 text-white shadow-lg outline-none placeholder:text-[#ffffff72]"
      />
      <div className="flex flex-row items-center gap-1">
        <button
          onClick={generatePassword}
          className="rounded-md bg-[#0000001f] px-2 py-1 text-sm text-[rgba(255,255,255,0.6)]"
        >
          Generate password and copy
        </button>
        {children}
      </div>
    </div>
  )
}

export default InputContainer
