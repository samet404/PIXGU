import { useRef, useState } from 'react'
import { useHostingHealth, usePlayers, useSocketIO, useTotalMatchCount } from '@/zustand/store'
import { createMatch } from '@/helpers/room'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { storePaintersAccess } from '@/store'

export const StartBtn = ({ roomID }: Props) => {
  const io = useSocketIO(s => s.io)
  const [remainSecond, setRemainSecond] = useState(5)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const sfx = useRef<HTMLAudioElement>(
    new Audio('/sound/sfx/button/relaxing_Crystal_but.mp3'),
  )

  useEffectOnce(() => {
    let remainSecond = 5
    const interval = setInterval(() => {
      if (remainSecond <= 0) {
        clearInterval(interval)
        return
      }
      setRemainSecond((prev) => prev - 1)
      remainSecond--
    }, 1000)

    return () => clearInterval(interval)
  })

  const handleClick = () => {
    sfx.current.play()
    io!.emit('game-started', true)
    storePaintersAccess.initUsers(usePlayers.getState().getPlayersIDs())

    useTotalMatchCount.getState().set(usePlayers.getState().value.count)
    useHostingHealth.getState().set('gameIsStarted')

    createMatch(roomID)
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
