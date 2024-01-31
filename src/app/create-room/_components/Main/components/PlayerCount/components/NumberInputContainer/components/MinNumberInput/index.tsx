'use client'

import { useRef } from 'react'
import BtnIncrement from './components/BtnIncrement'
import BtnDecrement from './components/BtnDecrement'
import { maxPlayerNumberAtom } from '../../../../../../../atoms'
import { useAtomValue } from 'jotai'

type MinNumberInputProps = {
  startValue?: number
  min?: number
  max?: number
}

const MinNumberInput = ({ min, max }: MinNumberInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const maxPlayerNumber = useAtomValue(maxPlayerNumberAtom)

  const handleOnBlur = () => {
    let inputValue: string = inputRef.current!.value
    const inputValueNum: number = parseInt(inputValue)

    if (max)
      if (inputValueNum > max) inputRef.current!.value = `${maxPlayerNumber}`
    if (min)
      if (inputValueNum < min) inputRef.current!.value = `${maxPlayerNumber}`
  }

  return (
    <div
      className={`flex w-[4.5rem] flex-row items-center justify-between rounded-md border-[0.2rem] border-[rgba(255,255,255,0.4)] bg-[rgba(255,255,255,0.2)] p-2 text-[rgba(255,255,255,0.8)] shadow-[0_0px_15px_1px_rgba(255,255,255,0.3)] outline-none`}
    >
      <input
        ref={inputRef}
        onBlur={handleOnBlur}
        defaultValue={min}
        className="outline-none"
        type="number"
      ></input>
      <div className="flex h-full w-40 flex-col justify-between rounded-md bg-[#ffffff25]">
        <BtnIncrement inputRef={inputRef} max={max} />
        <BtnDecrement inputRef={inputRef} min={min} />
      </div>
    </div>
  )
}

export default MinNumberInput
