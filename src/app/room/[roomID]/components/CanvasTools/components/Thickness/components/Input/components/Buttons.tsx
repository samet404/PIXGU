import { setSearchParam } from '@/utils/setSearchParam'
import { type MutableRefObject } from 'react'

type ButtonsProps = {
  inputRef: MutableRefObject<HTMLInputElement | null>
}

const Buttons = ({ inputRef }: ButtonsProps) => {
  const increment = () => {
    const value = inputRef.current!.value

    inputRef.current!.value = (parseInt(value) + 1).toString()
    setSearchParam('thickness', value)
  }

  const decrement = () => {
    const value = inputRef.current!.value

    inputRef.current!.value = (parseInt(value) - 1).toString()
    setSearchParam('thickness', value)
  }

  return (
    <div className="flex w-full flex-row text-[rgba(0,0,0,0.7)]">
      <button
        onClick={() => increment()}
        className="w-1/2 rounded-l-md bg-[rgba(255,255,255,0.5)] text-xl text-[#00000078] hover:opacity-50"
      >
        +
      </button>
      <button
        onClick={() => decrement()}
        className="w-1/2 rounded-r-md bg-[rgba(255,255,255,0.5)] text-xl text-[#00000078] hover:opacity-50"
      >
        -
      </button>
    </div>
  )
}

export default Buttons
