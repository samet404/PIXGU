'use client'

import { type Ref, forwardRef, type RefObject, type KeyboardEvent } from 'react'

type InputPropsType = {
  btnSendRef: RefObject<HTMLButtonElement>
}

const Input = forwardRef(
  ({ btnSendRef }: InputPropsType, ref: Ref<HTMLInputElement>) => {
    const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') btnSendRef.current?.click()
    }

    return (
      <input
        onKeyDown={handleOnKeyDown}
        ref={ref}
        type="text"
        className="grow p-2 text-[#ffffff9e]"
      />
    )
  },
)

Input.displayName = 'Input'

export default Input
