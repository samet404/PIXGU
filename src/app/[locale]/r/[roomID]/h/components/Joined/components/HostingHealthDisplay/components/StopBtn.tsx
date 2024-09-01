import { useRef } from 'react'
import {
  useGuessedPlayers,
  useHostingHealth,
  useOtherHostRoomStatus,
} from '@/zustand/store'

export const StopBtn = ({ roomID }: Props) => {
  const hostStatus = useHostingHealth((s) => s.status)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const sfx = useRef<HTMLAudioElement>(new Audio('/sound/sfx/painter.mp3'))

  const handleClick = () => {
    if (!buttonRef.current) return
    buttonRef.current.disabled = true

    sfx.current.play()

    const matchInterval = useOtherHostRoomStatus.getState().matchInterval
    if (matchInterval) clearInterval(matchInterval)
    useGuessedPlayers.getState().reset()

    useHostingHealth.getState().set('readyToStart')
  }

  if (hostStatus === 'gameIsStarted')
    return (
      <button
        ref={buttonRef}
        onClick={handleClick}
        className="animate-fade-up rounded-md bg-[#e15a77] px-4 py-2 leading-3 text-[#02020285] disabled:cursor-not-allowed disabled:opacity-65"
      >
        Stop the game
      </button>
    )
}

type Props = {
  roomID: string
}
