'use client'

import { useAtomValue, useSetAtom } from 'jotai'
import { inputPlaceholderValueAtom, inputValueAtom } from './atoms'

const Input = ({ username }: { username: string }) => {
  console.log('Input rendered')
  const setInputValue = useSetAtom(inputValueAtom)
  const inputPlaceholderValue = useAtomValue(inputPlaceholderValueAtom)

  return (
    <input
      onChange={(e) => setInputValue(e.target.value)}
      spellCheck={false}
      type="text"
      defaultValue={username}
      placeholder={inputPlaceholderValue ?? username}
      className="w-auto rounded-md border-none !bg-[rgba(0,0,0,0.2)] p-1 text-xl text-[rgba(255,255,255,0.7)] outline-white"
    />
  )
}

export default Input
