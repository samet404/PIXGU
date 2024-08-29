import { useEffect, useRef } from 'react'
import a from '/image/png/404.png'

export const useMessageSound = () => {
  const mute = useRef<boolean>(false)
  const audio = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audioPath = `/sound/sfx/button/message.mp3`
    audio.current = new Audio(audioPath)
    console.log(audio.current)
    console.log(audio.current.volume)
    audio.current.volume = 1
  }, [])

  const play = () => {
    if (!mute.current) {
      audio.current?.play()
    }
  }

  return { play, mute }
}
