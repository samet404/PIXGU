'use client'

import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGuessChatLayout, useWinnersChatLayout } from '@/zustand/store'
import { useShortcut } from '@/hooks/useShortcut'
import { useSpring, animated } from '@react-spring/web'

export const Change = () => {
  const [springs, api] = useSpring(() => ({
    from: {
      opacity: 1,
    },
    config: {
      duration: 200,
    },
  }))

  const change = () => {
    const currentChat = useGuessChatLayout.getState().value.isOpen ? 'guessChat' : 'winnersChat'
    switch (currentChat) {
      case 'guessChat':
        useWinnersChatLayout.getState().open()
        useGuessChatLayout.getState().close()
        break
      case 'winnersChat':
        useWinnersChatLayout.getState().close()
        useGuessChatLayout.getState().open()
        break
    }

    api.start({
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    })
  }


  useShortcut({
    keyName: 'Change in-game chat',
    onShortcut: change
  })



  return (
    <animated.button
      style={springs}
      onMouseDown={change}
      className="h-7 flex-shrink-0 flex items-center justify-center bg-[#ffffff31] rounded-md text-[#0000005f] font-[700] gap-2"
    >
      <div className="text-[0.8rem] leading-3">CTRL + C</div>
      <div className="size-4 rounded-full">
        <FontAwesomeIcon
          icon={faArrowsRotate}
          className="!h-full w-full pb-1"
        />
      </div>
    </animated.button>
  )
}

