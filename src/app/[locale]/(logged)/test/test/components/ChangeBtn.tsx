'use client'

import { useSetAtom } from 'jotai'
import { textAtom } from '../atoms'
import { useRef } from 'react'

export const ChangeBtn = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const setText = useSetAtom(textAtom)

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onMouseDown={() => setText(inputRef.current?.value ?? 'hellow')}>
        change
      </button>
    </div>
  )
}
