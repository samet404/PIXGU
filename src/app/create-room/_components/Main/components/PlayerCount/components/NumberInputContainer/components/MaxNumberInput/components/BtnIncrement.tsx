import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { type RefObject } from 'react'
import { useSetAtom } from 'jotai'
import { maxPlayerNumberAtom } from '../../../../../../atoms'

const BtnIncrement = ({
  inputRef,
  max,
}: {
  inputRef: RefObject<HTMLInputElement>
  max: number | undefined
}) => {
  const setMaxPlayerNumber = useSetAtom(maxPlayerNumberAtom)

  const increment = () => {
    console.log('odpshajdo')
    const inputValue: string = inputRef.current!.value
    const inputValueNum: number = parseInt(inputValue)

    if (max) if (inputValueNum + 1 > max) return null

    inputRef.current!.value = (inputValueNum + 1).toString()
    setMaxPlayerNumber(parseInt(inputRef.current!.value))
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
