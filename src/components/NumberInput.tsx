'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'

import { type ComponentProps, useState, useRef } from 'react'
import { useEffectOnce } from 'usehooks-ts'

type NumberInputProps = {
  startValue?: number
  min?: number
  max?: number
  className?: string
  placeholder?: string
} & ComponentProps<'input'>

const NumberInput = ({
  startValue = 0,
  min,
  max,
  className,
  placeholder,
  ...rest
}: NumberInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  if (max) if (startValue > max) console.error('Invalid start value \n')
  if (min) if (startValue < min) console.error('Invalid start value \n')

  const increment = () => {
    const inputValue = inputRef.current!.value as unknown as number

    if (max) if (inputValue + 1 > max) return
    inputValue + 1
  }

  const decrement = () => {
    const inputValue = inputRef.current!.value as unknown as number

    if (min) if (inputValue - 1 < min) return
    inputValue - 1
  }

  const handleOnKeyUp = (e: any) => {
    console.log(e.target.value)
    if (max) if (e.target.value > max) e.target.value = max
    if (min) if (e.target.value < min) e.target.value = min
  }

  return (
    <div
      className={`${className} flex flex-row items-center justify-between`}
      type="number"
      {...rest}
    >
      <input
        ref={inputRef}
        onKeyUp={handleOnKeyUp}
        defaultValue={startValue}
        className="w-full outline-none"
        type="number"
      ></input>
      <div className="flex flex-col">
        <FontAwesomeIcon icon={faChevronUp} onClick={() => increment()} />
        <FontAwesomeIcon
          icon={faChevronUp}
          onClick={() => decrement()}
          className="rotate-[180deg]"
        />
      </div>
    </div>
  )
}

export default NumberInput
