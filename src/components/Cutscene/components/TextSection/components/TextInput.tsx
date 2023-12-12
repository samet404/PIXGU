'use client'

import { useSetAtom, useAtomValue } from 'jotai'
import { useRef, useState } from 'react'
import { addToTextInputValueGroup, textInputValueGroupAtom } from './atoms'

const TextInput = ({ name }: { name: string | null }) => {
  const [errorText, setErrorText] = useState<string | undefined>()

  const textInputValueGroup = useAtomValue(textInputValueGroupAtom)
  const addTextInputValue = useSetAtom(addToTextInputValueGroup)
  const isFirstOnInput = useRef<boolean>(true)
  const indexOnTextInputValueGroup = useRef<number>(0)

  console.log(textInputValueGroup)

  const handleOnInput = (e: any) => {
    if (isFirstOnInput.current) {
      isFirstOnInput.current = false
      indexOnTextInputValueGroup.current = textInputValueGroup.length
    }

    addTextInputValue({
      name: name!,
      value: e.target.value,
    })

    // length check
    if (e.target.value.length >= 255) setErrorText('Max length reached!')
    else setErrorText(undefined)
  }

  if (name)
    return (
      <div className="flex w-full flex-col justify-center gap-2 py-5 ">
        <input
          max={255}
          onInput={handleOnInput}
          placeholder="Enter text here"
          spellCheck={false}
          className="text-white-200 w-full bg-gradient-to-r from-[rgba(255,255,255,0.3)]  to-[rgba(255,255,255,0.05)] p-3 shadow-[0px_0px_50px_-15px_#000000]  outline-none "
          type="text"
        ></input>
        {errorText && (
          <div
            style={{
              color: 'rgba(255, 15, 127, 0.925)',
            }}
          >
            {errorText}
          </div>
        )}
      </div>
    )
  else console.error('TextInput component says: You must enter an id value!')
}

export default TextInput
