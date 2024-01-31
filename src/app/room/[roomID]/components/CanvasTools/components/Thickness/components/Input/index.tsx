'use client'

import { useRef } from 'react'
import Buttons from './components/Buttons'
import { canvasPenThicknessAtom } from '@/app/room/[roomID]/atoms'
import { useSetAtom } from 'jotai'

const Input = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const setCanvasPenThickness = useSetAtom(canvasPenThicknessAtom)

  const handleOnInput = () => {
    setCanvasPenThickness(parseInt(inputRef.current!.value))
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <Buttons inputRef={inputRef} />
      <input
        defaultValue={5}
        onInput={() => handleOnInput()}
        className="w-full rounded-md bg-[#ffffff3c] p-1 text-white"
        type="number"
        ref={inputRef}
      />
    </div>
  )
}

export default Input
