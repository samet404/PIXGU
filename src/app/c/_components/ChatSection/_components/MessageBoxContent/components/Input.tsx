'use client'

import { type Ref, forwardRef } from 'react'

const Input = forwardRef((_: unknown, ref: Ref<HTMLInputElement>) => {
  return <input ref={ref} type="text" className="grow p-2 text-[#ffffff9e]" />
})

Input.displayName = 'Input'

export default Input
