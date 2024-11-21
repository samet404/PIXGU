'use client'

import { useEventListener } from 'usehooks-ts'
import sendImg from '@/png/icons8-send-30-black.png'
import Image from 'next/image'
import { useRef } from 'react'
import { sendToHostPeer } from '@/utils/sendToHostPeer'

export const Input = ({ name }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const sendMsg = () => {
    if (!inputRef.current) return

    sendToHostPeer({

      event: name,
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
    <div className="flex flex-row items-center rounded-md bg-[#ffffff3b]">
      <input
        ref={inputRef}
        spellCheck={false}
        type="text"
        className="w-full px-2  text-[#043243] selection:!bg-[#ffffff35]"
      />
      <button
        onMouseDown={sendMsg}
        className="h-full rounded-r-md bg-[#ffffff5e] px-2 py-1 shadow-[0_0px_10px_1px_rgba(0,0,0,0.1)]"
      >
        <Image src={sendImg} alt="send" className="size-5 opacity-20" />
      </button>
    </div>
  )
}


type Props = {
  name: 'guessChat' | 'winnersChat'
}