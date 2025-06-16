'use client'

import { sendToHostPeer } from '@/utils/sendToHostPeer'
import { postMsgToPlayerTimerWorker } from '@/workers'
import { useCoins } from '@/zustand/store/useCoins'
import { useMatchStatusClient } from '@/zustand/store/useMatchStatusClient'
import { useMyCoin } from '@/zustand/store/useMyCoin'
import { useSelectThemePanel } from '@/zustand/store/useSelectThemePanel'


import { useEffect, useRef } from 'react'
import clsx from 'clsx'

export const Btn = ({ theme, position }: Props) => {
  const btnRef = useRef<HTMLButtonElement>(null)
  const btnSfx = useRef<HTMLAudioElement>(
    new Audio('/sound/sfx/button/fade_btn.ogg'),
  )

  useEffect(() => {
    btnSfx.current.volume = 1
  }, [])

  const onClick = () => {
    if (!btnRef.current) return
    btnSfx.current.play()

    btnRef.current.disabled = true
    useSelectThemePanel.getState().selectTheme({
      theme,
    })

    postMsgToPlayerTimerWorker({
      ID: 'PAINTER_SELECTING_REMAIN_TIME',
      event: 'stop',
    })

    useMatchStatusClient.getState().setTheme(theme)

    sendToHostPeer({
      event: 'selectTheme',
      data: theme,
    })
    useCoins.getState().newMatch()
    useMyCoin.getState().newMatch()
  }
  return (
    <button
      ref={btnRef}
      onClick={onClick}
      className={clsx(
        `h-full grow break-words text-[1rem] text-[#00000093] hover:text-violet-600`,
        {
          'animate-fade-right': position === 1,
          'animate-fade-left': position === 2,
        },
      )}
    >
      {theme}
    </button>
  )
}

type Props = {
  theme: string
  position: 1 | 2
}
