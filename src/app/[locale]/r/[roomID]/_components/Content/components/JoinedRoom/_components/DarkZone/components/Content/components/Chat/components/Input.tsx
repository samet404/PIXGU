'use client'

import { useEventListener } from 'usehooks-ts'
import sendImg from '@/png/icons8-send-30.png'
import Image from 'next/image'
import { Fragment, useRef } from 'react'
import { sendToHostPeer } from '@/utils/sendToHostPeer'

export const Input = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const sendMsg = () => {
    if (!inputRef.current) return
    if (inputRef.current.value === '') return

    inputRef.current.focus()
    sendToHostPeer({
      from: 'client',
      event: 'darkZoneChat',
      data: {
        msg: inputRef.current.value,
      },
    })

    inputRef.current.value = ''
  }

  useEventListener(
    'keydown',
    (e) => {
      if (!inputRef.current?.value) return

      if (e.key === 'Enter') sendMsg()
    },
    inputRef,
  )

  return (
    <Fragment>
      <input
        ref={inputRef}
        spellCheck={false}
        type="text"
        className="w-full px-2 py-1 text-[1.2rem] leading-4 text-[#ffffffbd]"
      />
      <button
        onMouseDown={sendMsg}
        className="h-full rounded-r-md  px-2 py-2 shadow-[0_0px_10px_1px_rgba(0,0,0,0.1)]"
      >
        <Image src={sendImg} alt="send" className="size-6 opacity-20" />
      </button>
    </Fragment>
  )
}
