'use client'

import { HostPeerCtx } from '@/context/client/react/hostPeerCtx'
import { useEventListener } from 'usehooks-ts'
import sendImg from '@/png/icons8-send-30-black.png'
import { sendToPeer } from '@/utils/sendToPeer'
import Image from 'next/image'
import { Fragment, useContext, useRef } from 'react'

export const Input = () => {
  const hostPeer = useContext(HostPeerCtx)
  const inputRef = useRef<HTMLInputElement>(null)

  const sendMsg = () => {
    if (!inputRef.current) return

    sendToPeer(hostPeer.peer!, {
      from: 'client',
      event: 'guessChat',
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
        className="w-full px-2 py-1 text-[#00000081]"
      />
      <button
        onMouseDown={sendMsg}
        className="h-full rounded-r-md bg-[#ffffff84] px-2 py-1 shadow-[0_0px_10px_1px_rgba(0,0,0,0.1)]"
      >
        <Image src={sendImg} alt="send" className="size-6 opacity-20" />
      </button>
    </Fragment>
  )
}
