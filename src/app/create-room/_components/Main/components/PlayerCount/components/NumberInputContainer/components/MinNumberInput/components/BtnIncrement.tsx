import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  maxPlayerNumberAtom,
  minPlayerNumberAtom,
} from '../../../../../../../../atoms'
import { useAtomValue, useSetAtom } from 'jotai'

const BtnIncrement = ({
  inputRef,
  max,
}: {
  inputRef: any
  max: number | undefined
}) => {
  const setMinPlayerNumber = useSetAtom(minPlayerNumberAtom)
  const maxPlayerNumber = useAtomValue(maxPlayerNumberAtom)

  const increment = () => {
    const inputValue: string = inputRef.current!.value
    const inputValueNum: number = parseInt(inputValue)

    if (inputValueNum + 1 > maxPlayerNumber) return null
    if (max) if (inputValueNum + 1 > max) return null

    inputRef.current!.value = (inputValueNum + 1).toString()
    setMinPlayerNumber(inputRef.current!.value)
  }
  return (
    <button className="flex rounded-t-md px-[0.2rem] duration-300 hover:scale-[140%] hover:bg-yellow-300 hover:text-green-500 hover:shadow-lg">
      <FontAwesomeIcon
        icon={faChevronUp}
        onClick={() => increment()}
        fontSize={35}
      />
    </button>
  )
}

export default BtnIncrement
