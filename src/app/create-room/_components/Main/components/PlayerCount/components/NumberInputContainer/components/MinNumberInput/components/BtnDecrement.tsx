import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSetAtom } from 'jotai'
import { minPlayerNumberAtom } from '../../../../../../../../atoms'

const BtnDecrement = ({
  inputRef,
  min,
}: {
  inputRef: any
  min: number | undefined
}) => {
  const setMinPlayerNumber = useSetAtom(minPlayerNumberAtom)

  const decrement = () => {
    const inputValue: string = inputRef.current!.value
    const inputValueNum: number = parseInt(inputValue)

    if (min) if (inputValueNum - 1 < min) return null

    inputRef.current!.value = (inputValueNum - 1).toString()
    setMinPlayerNumber(inputRef.current!.value)
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
