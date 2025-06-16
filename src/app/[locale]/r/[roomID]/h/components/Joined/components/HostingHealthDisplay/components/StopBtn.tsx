import { sendToAllPeers } from '@/utils/sendToAllPeers'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { postMsgToHostTimerWorker } from '@/workers'
import { useRef, useState } from 'react'
import { useGuessedPlayers } from '@/zustand/store/useGuessedPlayers'
import { useHostingHealth } from '@/zustand/store/useHostingHealth'
import { useHostPainterData } from '@/zustand/store/useHostPainterData'
import { useMatchStatus } from '@/zustand/store/useMatchStatus'
import { useSocketIO } from '@/zustand/store/useSocketIO'
import { useSpectators } from '@/zustand/store/useSpectators'

export const StopBtn = ({ displayText }: Props) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const sfx = useRef<HTMLAudioElement>(new Audio('/sound/sfx/painter.mp3'))
  const [remainSecond, setRemainSecond] = useState(5)
  const io = useSocketIO(s => s.io)

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
  })

  const handleClick = () => {
    io!.emit('game-started', false)
    if (!buttonRef.current) return
    buttonRef.current.disabled = true

    sfx.current.play()

    useMatchStatus.getState().reset()
    postMsgToHostTimerWorker({
      ID: 'MATCH_ENDED',
      event: 'stop',
    })
    postMsgToHostTimerWorker({
      ID: 'MATCH_REMAIN_TIME',
      event: 'stop',
    })
    useGuessedPlayers.getState().reset()
    useHostingHealth.getState().set('readyToStart')
    useSpectators.getState().reset()
    useHostPainterData.getState().reset()

    sendToAllPeers({
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
      {displayText} {remainSecond !== 0 && `(${remainSecond}s)`}
    </button>
  )
}

type Props = {
  displayText: string
}
