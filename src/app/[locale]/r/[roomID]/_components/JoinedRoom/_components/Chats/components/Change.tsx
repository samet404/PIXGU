'use client'

import { useGuessChatLayout } from '@/zustand/store/useGuessChatLayout'
import { useGeneralChatLayout } from '@/zustand/store/useGeneralChatLayout'
import { useShortcut } from '@/hooks/useShortcut'
import { useSpring, animated } from '@react-spring/web'
import { useControls } from '@/zustand/store/useControls'
import { RefreshCcw } from 'lucide-react'

export const Change = () => {
  const keyBind = useControls(s => s.keys['Change in-game chat'])
  const [springs, api] = useSpring(() => ({
    from: {
      opacity: 1,
    },
    config: {
      duration: 200,
    },
  }))

  const change = () => {
    const currentChat = useGuessChatLayout.getState().value.isOpen ? 'guessChat' : 'generalChat'
    switch (currentChat) {
      case 'guessChat':
        useGeneralChatLayout.getState().open()
        useGuessChatLayout.getState().close()
        break
      case 'generalChat':
        useGeneralChatLayout.getState().close()
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
      className="h-7 flex-shrink-0 flex items-center justify-center bg-[#ffffff31] rounded-md text-[#ffffff5f] font-[700] gap-2"
    >
      <div className="text-[0.8rem] leading-3">{keyBind.join(' + ')}</div>
      <RefreshCcw className="size-5 opacity-50 text-[white] " />
    </animated.button>
  )
}

