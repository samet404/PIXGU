'use client'

import { useRef } from 'react'
import BtnSend from './components/BtnSend'
import Input from './components/Input'

const MessageInputContent = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const btnSendRef = useRef<HTMLButtonElement>(null)
  return (
    <div className="flex h-[2.5rem] flex-row rounded-lg bg-[#00000039] shadow-[0_0px_30px_1px_rgba(0,0,0,0.1)]">
      <Input ref={inputRef} btnSendRef={btnSendRef} />
      <BtnSend ref={btnSendRef} inputRef={inputRef} />
    </div>
  )
}
export default MessageInputContent
