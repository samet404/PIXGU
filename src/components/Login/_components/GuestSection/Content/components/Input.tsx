'use client'

import { forwardRef, type Ref } from 'react'

export const Input = forwardRef((_: unknown, ref: Ref<HTMLInputElement>) => {
  return (
    <input
      ref={ref}
      type="text"
      placeholder="Your name here"
      spellCheck={false}
      className="rounded-md bg-[#0000002c] px-2 py-1"
    />
  )
})

Input.displayName = 'guestInput'