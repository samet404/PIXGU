'use client'

import { useCreateRoomInputs } from '@/zustand/store'
import { createId } from '@paralleldrive/cuid2'
import { useRef, useState } from 'react'

const InputContainer = () => {
  const [isPublic, setIsPublic] = useState<boolean>(true)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleOnInput = () => {
    if (inputRef.current?.value != undefined) {
      useCreateRoomInputs.getState().add({
        ...useCreateRoomInputs.getState().value,
        password: inputRef.current.value,
      })

      if (inputRef.current?.value == '') setIsPublic(true)
      if (inputRef.current.value != '') setIsPublic(false)
    }
  }

  const generatePassword = () => {
    if (inputRef.current?.value != undefined) {
      const pass = createId()
      setIsPublic(false)
      inputRef.current.value = pass
      useCreateRoomInputs.getState().add({
        ...useCreateRoomInputs.getState().value,
        password: inputRef.current.value,
      })
    }
  }

  return (
    <div className="flex flex-col items-start gap-2 p-2">
      <input
        spellCheck={false}
        onInput={() => handleOnInput()}
        ref={inputRef}
        placeholder={'To make private, set pass 💧'}
        type="text"
        className="w-full rounded-md bg-[rgba(255,255,255,0.2)] px-[0.40rem] py-1 text-white shadow-lg outline-none placeholder:text-[#ffffff72]"
      />
      <div className="flex flex-row gap-1">
        <div className="flex flex-row flex-wrap rounded-md bg-[#0000001f] px-2 py-1 text-sm">
          {isPublic ? (
            <div className="text-green-400">Public</div>
          ) : (
            <div className="text-orange-400">Private</div>
          )}
        </div>
        <button
          onClick={() => generatePassword()}
          className="rounded-md bg-[#0000001f] px-2 py-1 text-sm text-[rgba(255,255,255,0.6)]"
        >
          Generate auto password
        </button>
      </div>
    </div>
  )
}

export default InputContainer
