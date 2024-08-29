'use client'

import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEventListener } from 'usehooks-ts'
import { useRef } from 'react'

export const Change = ({ to }: Props) => {
  const documentRef = useRef(document)

  const change = async () => {
    if (to === 'winnersChat') {
      const { useWinnersChatLayout, useGuessChatLayout } = await import(
        '@/zustand/store'
      )

      useWinnersChatLayout.getState().open()
      useGuessChatLayout.getState().close()
    } else if (to === 'guessChat') {
      const { useWinnersChatLayout, useGuessChatLayout } = await import(
        '@/zustand/store'
      )

      useWinnersChatLayout.getState().close()
      useGuessChatLayout.getState().open()
    }
  }

  useEventListener(
    'keydown',
    async (e) => {
      if (e.ctrlKey && e.key === 'd') {
        e.preventDefault()
        change()
      }
    },
    documentRef,
  )

  return (
    <button
      onClick={change}
      className="group relative flex h-7 w-full flex-row items-center justify-center gap-2 rounded-full bg-[#ffffff7f] px-2 text-[#00000069] shadow-[0_0px_10px_1px_rgba(0,0,0,0.2)]"
    >
      <span className="absolute right-2 top-11 z-50 line-clamp-1 hidden w-[8rem] animate-fade-down rounded-md bg-gray-100 p-1  text-[#929292] shadow-[0_0px_10px_1px_rgba(0,0,0,0.5)] animate-delay-75 group-hover:flex group-hover:justify-center">
        Changes chat
      </span>
      <div className="text-[0.8rem] leading-3">CTRL + D</div>
      <div className="size-4 rounded-full">
        <FontAwesomeIcon
          icon={faArrowsRotate}
          className="!h-full w-full pb-1"
        />
      </div>
    </button>
  )
}

type Props = {
  to: 'winnersChat' | 'guessChat'
}
