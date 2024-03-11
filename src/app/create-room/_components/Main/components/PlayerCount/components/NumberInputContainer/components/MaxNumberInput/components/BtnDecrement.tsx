import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { type RefObject } from 'react'
import {
  maxPlayerNumberAtom,
  minPlayerNumberAtom,
} from '../../../../../../../../atoms'
import { useAtomValue, useSetAtom } from 'jotai'

type BtnDecrementProps = {
  inputRef: RefObject<HTMLInputElement>
  min: number | undefined
}

const BtnDecrement = ({ inputRef, min }: BtnDecrementProps) => {
  const setMaxPlayerNumber = useSetAtom(maxPlayerNumberAtom)
  const minPlayerNumber = useAtomValue(minPlayerNumberAtom)

  const decrement = () => {
    const inputValue: string = inputRef.current!.value
    const inputValueNum: number = parseInt(inputValue)

    if (inputValueNum - 1 < minPlayerNumber) return null
    if (min) if (inputValueNum - 1 < min) return null

    inputRef.current!.value = (inputValueNum - 1).toString()
    setMaxPlayerNumber(inputValueNum - 1)
  }

  return (
    <button className="flex rounded-b-md px-[0.2rem] duration-300 hover:scale-[140%] hover:bg-yellow-300 hover:text-rose-500 hover:shadow-lg">
      <FontAwesomeIcon
        icon={faChevronUp}
        onClick={() => decrement()}
        className="rotate-[180deg]"
        fontSize={35}
      />
    </button>
  )
}

export default BtnDecrement
