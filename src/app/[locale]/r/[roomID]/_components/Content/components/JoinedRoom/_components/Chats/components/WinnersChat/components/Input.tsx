'use client'

import { useEventListener } from 'usehooks-ts'
import sendImg from '@/png/icons8-send-30-black.png'
import Image from 'next/image'
import { Fragment, useRef } from 'react'
import { sendToHostPeer } from '@/utils/sendToHostPeer'

export const Input = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const sendMsg = () => {
    if (!inputRef.current) return

    sendToHostPeer({
      from: 'client',
      event: 'winnersChat',
      data: {
        msg: inputRef.current.value,
      },
    })

    inputRef.current.value = ''
  }

  useEventListener(
    'keydown',
    (e) => {
      if (!inputRef.current?.value) return null

      if (e.key === 'Enter') {
        sendMsg()
        inputRef.current.value = ''
        inputRef.current.focus()
      }
    },
    inputRef,
  )

  return (
    <Fragment>
      <input
        ref={inputRef}
        spellCheck={false}
        type="text"
        className="w-full px-2 text-[#00000081]"
      />
      <button
        onMouseDown={sendMsg}
        className="h-full rounded-r-md bg-[#ffffff84] px-2 py-1 shadow-[0_0px_10px_1px_rgba(0,0,0,0.1)]"
      >
        <Image src={sendImg} alt="send" className="size-5 opacity-20" />
      </button>
    </Fragment>
  )
}
