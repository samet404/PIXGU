'use client'

import { useSetAtom } from 'jotai'
import { useRef } from 'react'
import { nameAtom } from '../../../../../atoms'
import InputInfo from './components/InputInfo'
import { inputInfoTextAtom } from './atoms'

const InputContainer = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const setName = useSetAtom(nameAtom)
  const setInputInfoText = useSetAtom(inputInfoTextAtom)

  const handleOnInput = () => {
    if (inputRef.current) {
      if (inputRef.current?.value) {
        if (inputRef.current.value.length !== 0) {
          setName(inputRef.current.value)
          setInputInfoText('Ready to go!')
        }
      }

      if (!inputRef.current.value) setInputInfoText('pls enter name >:I')

      if (inputRef.current.value.length >= 255)
        setInputInfoText("No, you can't go on. It's too long.")
    }
  }

  return (
    <div className="flex flex-col items-start gap-2 p-2">
      <input
        spellCheck={false}
        onInput={() => handleOnInput()}
        ref={inputRef}
        placeholder={'Room name here ✨'}
        type="text"
        className="w-full rounded-md bg-[rgba(255,255,255,0.2)] p-1 text-white shadow-lg outline-none placeholder:text-[#ffffff72]"
      />
      <InputInfo />
    </div>
  )
}

export default InputContainer
