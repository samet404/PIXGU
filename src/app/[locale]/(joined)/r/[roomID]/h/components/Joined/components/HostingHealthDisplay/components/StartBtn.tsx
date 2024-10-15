import { useRef, useState } from 'react'
import { useHostingHealth } from '@/zustand/store'
import { createMatch } from 'src/funcs/createMatch'
import { useEffectOnce } from '@/hooks/useEffectOnce'

export const StartBtn = ({ roomID }: Props) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const sfx = useRef<HTMLAudioElement>(
    new Audio('/sound/sfx/button/relaxing_Crystal_but.mp3'),
  )
  const [remainSecond, setRemainSecond] = useState(5)

  useEffectOnce(() => {
    let remainSecond = 5
    const interval = setInterval(() => {
      if (remainSecond === 0) {
        clearInterval(interval)
        return
      }
      setRemainSecond((prev) => prev - 1)
      remainSecond--
    }, 1000)

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  })

  const handleClick = () => {
    if (!buttonRef.current) return
    sfx.current.play()

    createMatch(roomID)
    useHostingHealth.getState().set('gameIsStarted')
  }

  return (
    <button
      ref={buttonRef}
      disabled={remainSecond !== 0}
      onClick={handleClick}
      className="animate-fade-up rounded-md bg-[#34d3cb] px-4 py-2 leading-3 text-[#02020285] disabled:cursor-not-allowed disabled:bg-[#34d3cb95]"
    >
      Start the game {remainSecond !== 0 && `(${remainSecond}s)`}
    </button>
  )
}

type Props = {
  roomID: string
}
