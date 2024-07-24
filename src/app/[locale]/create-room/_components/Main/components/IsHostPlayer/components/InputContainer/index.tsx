'use client'

import { BtnNo } from './components/BtnNo'
import { BtnYes } from './components/BtnYes'

const InputContainer = () => {
  return (
    <div className="flex flex-row p-2 font-[900] text-[#0000005a]">
      <BtnYes />
      <BtnNo />
    </div>
  )
}

export default InputContainer
