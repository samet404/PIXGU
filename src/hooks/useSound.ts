import { useRef } from 'react'
import { useEffectOnce } from './useEffectOnce'

export const useSound = (src: string) => {
  const audio = useRef<HTMLAudioElement | null>(null)

  useEffectOnce(() => {
    audio.current = new Audio(src)
    audio.current.volume = 1
  })

  const play = () => {
    audio.current?.play()
  }

  const pause = () => {
    audio.current?.pause()
  }

  return { play, pause }
}
