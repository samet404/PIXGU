'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'

import { type ComponentProps, useRef } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import { maxPlayerNumberAtom, minPlayerNumberAtom } from '../../../../../atoms'
import BtnIncrement from './components/BtnIncrement'
import BtnDecrement from './components/BtnDecrement'

type MaxNumberInputProps = {
  startValue?: number
  min?: number
  max?: number
  className?: string
  placeholder?: string
} & ComponentProps<'input'>

const MaxNumberInput = ({ min, max }: MaxNumberInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const minPlayerNumber = useAtomValue(minPlayerNumberAtom)

  const handleOnBlur = () => {
    let inputValue: string = inputRef.current!.value
    const inputValueNum: number = parseInt(inputValue)

    if (max)
      if (inputValueNum > max) inputRef.current!.value = `${minPlayerNumber}`
    if (min)
      if (inputValueNum < min) inputRef.current!.value = `${minPlayerNumber}`
  }

  return (
    <div
      className={`flex w-[4.5rem] flex-row items-center justify-between rounded-md border-[0.2rem] border-[rgba(255,255,255,0.4)] bg-[rgba(255,255,255,0.2)]  p-2 text-[rgba(255,255,255,0.8)] shadow-[0_0px_15px_1px_rgba(255,255,255,0.3)] outline-none`}
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

export default MaxNumberInput
