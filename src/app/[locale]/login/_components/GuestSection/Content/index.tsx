'use client'

import {
  forwardRef,
  Fragment,
  useRef,
  type MutableRefObject,
  type Ref,
  type RefObject,
} from 'react'
import { Btn } from './components/Btn'
import { Input } from './components/Input'

export const Content = () => {
  const receivedInputRef = useRef<HTMLInputElement>(null)

  return (
    <Fragment>
      <Input ref={receivedInputRef} />
      <Btn inputRef={receivedInputRef} />
    </Fragment>
  )
}
