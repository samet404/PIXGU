import { useRef } from 'react'
import { createMatch } from '../../ConnectToPeers/funcs'
import { useHostingHealth } from '@/zustand/store'

export const StartBtn = ({ roomID }: Props) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const sfx = useRef<HTMLAudioElement>(
    new Audio('/sound/sfx/button/startGame.mp3'),
  )

  const handleClick = () => {
    if (!buttonRef.current) return
    buttonRef.current.disabled = true

    sfx.current.play()

    createMatch(roomID)
    useHostingHealth.getState().set('gameIsStarted')
  }

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className="animate-fade-up rounded-md bg-[#34d3cb] px-4 py-2 leading-3 text-[#02020285] disabled:cursor-not-allowed disabled:opacity-65"
    >
      Start the game
    </button>
  )
}

type Props = {
  roomID: string
}
