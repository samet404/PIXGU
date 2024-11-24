'use client'

import { Btn } from './components/Btn'
import { Input } from './components/Input'
import {
  Fragment,
  useRef,
} from 'react'

export const Content = () => {
  const receivedInputRef = useRef<HTMLInputElement>(null)

  return (
    <Fragment>
      <Input ref={receivedInputRef} />
      <Btn inputRef={receivedInputRef} />
    </Fragment>
  )
}
