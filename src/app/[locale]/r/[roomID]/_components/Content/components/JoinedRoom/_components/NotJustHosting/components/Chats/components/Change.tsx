'use client'

import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSetAtom } from 'jotai'
import { chatTypeAtom } from './atoms'
import { useEventListener } from 'usehooks-ts'
import { useRef } from 'react'

export const Change = ({ to }: Props) => {
  const setChat = useSetAtom(chatTypeAtom)
  const documentRef = useRef(document)

  useEventListener(
    'keydown',
    (e) => {
      if (e.ctrlKey && e.key === 'd') {
        e.preventDefault()
        setChat(to)
      }
    },
    documentRef,
  )

  return (
    <button
      onClick={() => setChat(to)}
      className="flex flex-row justify-center gap-2  rounded-full bg-[#ffffff7f] px-2 pt-1 text-[#00000069] shadow-[0_0px_10px_1px_rgba(0,0,0,0.2)]"
    >
      CTRL + D
      <div className="size-6 rounded-full">
        <FontAwesomeIcon icon={faArrowsRotate} className="!h-full w-full" />
      </div>
    </button>
  )
}

type Props = {
  to: 'winnersChat' | 'guessChat'
}
