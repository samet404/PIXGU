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
  ...rest
}: NumberInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  if (max) if (startValue > max) console.error('Invalid start value \n')
  if (min) if (startValue < min) console.error('Invalid start value \n')

  const increment = () => {
    let inputValue: string = inputRef.current!.value

    if (max) if (parseInt(inputValue) + 1 > max) return ''

    console.log((parseInt(inputValue) + 4).toString())
    inputRef.current!.value = (parseInt(inputValue) + 1).toString()
  }

  const decrement = () => {
    let inputValue: string = inputRef.current!.value

    if (min) if (parseInt(inputValue) - 1 < min) return ''
    inputRef.current!.value = (parseInt(inputValue) - 1).toString()
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
