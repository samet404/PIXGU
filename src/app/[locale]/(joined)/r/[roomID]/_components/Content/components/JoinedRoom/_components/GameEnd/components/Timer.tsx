import { percentageOf } from '@/utils/percentageOf'
import { useAmIPainting, useAmISpectator, useCoins, useGameEndedPanel, useGuessChatLayout, useGuessedPlayers, useIsGameStopped, useMatchStatusClient, useMyCoin, useNewPainterPanel, useRoomGuessChatMsgsStore, useRoomWinnersChatMsgsStore, useSelectThemePanel, useSpectators, useWhoIsPainterClient, useWinnersChatLayout } from '@/zustand/store'
import { useEffect, useRef, useState } from 'react'

export const Timer = () => {
  const [width, setWidth] = useState<number>()
  const time = useRef(20000)
  const passedTime = useRef<number>(0)
  const updatePerMs = useRef<number>(50)

  useEffect(() => {
    const interval = setInterval(() => {
      if (passedTime.current >= time.current) {
        clearInterval(interval)
        useIsGameStopped.getState().addCode('waitingForHost')
        useWhoIsPainterClient.getState().reset()
        useAmIPainting.getState().reset()
        useWinnersChatLayout.getState().reset()
        useGuessChatLayout.getState().reset()
        useRoomWinnersChatMsgsStore.getState().reset()
        useRoomGuessChatMsgsStore.getState().reset()
        useGuessedPlayers.getState().reset()
        useMyCoin.getState().reset()
        useCoins.getState().reset()
        useSpectators.getState().reset()
        useAmISpectator.getState().reset()
        useNewPainterPanel.getState().reset()
        useMatchStatusClient.getState().reset()
        useSelectThemePanel.getState().reset()
        useGameEndedPanel.getState().close()
        return
      }

      passedTime.current += updatePerMs.current
      setWidth(percentageOf(passedTime.current, time.current))
    }, updatePerMs.current)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div
      style={{
        width: `${width ?? 0}%`,
      }}
      className={`absolute  left-0 top-0 h-6 bg-[#ffffffca] duration-75`}
    ></div>
  )
}
