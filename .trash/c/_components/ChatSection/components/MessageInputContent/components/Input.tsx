'use client'

import { type Ref, forwardRef, type RefObject, type KeyboardEvent, useRef } from 'react'
import { isBtnSendGlowingAtom } from '../atoms'
import { useSetAtom } from 'jotai'

type InputPropsType = {
  btnSendRef: RefObject<HTMLButtonElement>
}

const Input = forwardRef(
  ({ btnSendRef }: InputPropsType, ref: Ref<HTMLInputElement>) => {
    const setIsBtnSendGlowing = useSetAtom(isBtnSendGlowingAtom)
    const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') btnSendRef.current?.click()
    }

    const handleOnInput = (e: KeyboardEvent<HTMLInputElement>) => {
      setIsBtnSendGlowing(true)
      if ((e.target as HTMLInputElement).value === '') setIsBtnSendGlowing(false)
    }

    return (
      <input
        onKeyDown={handleOnKeyDown}
        onInput={handleOnInput}
        ref={ref}
        type="text"
        className="grow p-2 text-[#ffffff9e]"
      />
    )
  },
)

Input.displayName = 'Input'

export default Input
