import { useRef, useState } from 'react'
import {
  useGuessedPlayers,
  useHostingHealth,
  useHostPainterData,
  useMatchStatus,
  useSpectators,
} from '@/zustand/store'
import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { useEffectOnce } from '@/hooks/useEffectOnce'

export const StopBtn = ({ roomID }: Props) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const sfx = useRef<HTMLAudioElement>(new Audio('/sound/sfx/painter.mp3'))
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
    buttonRef.current.disabled = true

    sfx.current.play()

    useMatchStatus.getState().reset()
    useGuessedPlayers.getState().reset()
    useHostingHealth.getState().set('readyToStart')
    useSpectators.getState().reset()
    useHostPainterData.getState().reset()

    sendToAllPeers({
      from: 'host',
      event: 'gameIsStopped',
    })
  }

  return (
    <button
      ref={buttonRef}
      disabled={remainSecond !== 0}
      onClick={handleClick}
      className="animate-fade-up rounded-md bg-[#e15a77] px-4 py-2 leading-3 text-[#02020285] disabled:cursor-not-allowed disabled:bg-[#e15a7795]"
    >
      Stop the game {remainSecond !== 0 && `(${remainSecond}s)`}
    </button>
  )
}

type Props = {
  roomID: string
}
