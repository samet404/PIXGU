'use client'

import { Fragment, useRef } from 'react'
import BtnSend from './components/BtnSend'
import Input from './components/Input'

const MessageBoxContent = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <Fragment>
      <Input ref={inputRef} />
      <BtnSend inputRef={inputRef} />
    </Fragment>
  )
}
export default MessageBoxContent
