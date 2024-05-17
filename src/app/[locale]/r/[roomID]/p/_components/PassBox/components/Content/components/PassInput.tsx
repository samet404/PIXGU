import { type Ref, forwardRef } from 'react'
import { Urbanist } from 'next/font/google'

const urbanist = Urbanist({
  weight: ['700', '600'],
  subsets: ['latin'],
})

const PassInput = forwardRef((_: unknown, ref: Ref<HTMLInputElement>) => {
  return (
    <input
      ref={ref}
      type="text"
      spellCheck="false"
      placeholder="type here"
      className={`${urbanist.className} animate-[pass-input_4s_ease-in-out_infinite] bg-gradient-to-r from-[#ffffffc0] via-[#ffffff55] to-[#ffffffb8] bg-[length:400%_400%] p-1 text-[1.2rem] text-[#00000081] shadow-[0_0px_10px_1px_rgba(255,255,255,0.1)]`}
    />
  )
})

PassInput.displayName = 'PassInput'

export default PassInput
