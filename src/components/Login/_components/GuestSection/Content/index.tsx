'use client'

import { Btn } from './components/Btn'
import { Input } from './components/Input'
import {
  Fragment,
  useRef,
} from 'react'

export const Content = ({ redirectToRoomID }: Props) => {
  const receivedInputRef = useRef<HTMLInputElement>(null)

  return (
    <Fragment>
      <Input ref={receivedInputRef} />
      <div className='flex flex-row gap-2 w-full'>
        <Btn inputRef={receivedInputRef} joinGame={true} />
        {!redirectToRoomID && <Btn inputRef={receivedInputRef} joinGame={false} />}
      </div>
    </Fragment>
  )
}

type Props = {
  redirectToRoomID?: string
}