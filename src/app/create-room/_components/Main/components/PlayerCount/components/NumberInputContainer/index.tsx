import { Fragment } from 'react'
import MaxNumberInput from './components/MaxNumberInput'
import MinNumberInput from './components/MinNumberInput'

type NumberInputContainerProps = {
  minInputValue: number
  maxInputValue: number
}

const NumberInputContainer = ({
  minInputValue,
  maxInputValue,
}: NumberInputContainerProps) => {
  return (
    <Fragment>
      <div className="flex flex-col">
        <div className="text-[#ffffffbd]">Max:</div>
        <MaxNumberInput min={minInputValue} max={maxInputValue} />
      </div>
      <div className="flex flex-col">
        <div className="text-[#ffffffbd]">Min:</div>
        <MinNumberInput min={minInputValue} max={maxInputValue} />
      </div>
    </Fragment>
  )
}

export default NumberInputContainer
