import { useEffect, useRef } from 'react'

export const useMessageSound = () => {
  const mute = useRef<boolean>(false)
  const audio = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audioPath = `/sound/sfx/chat/message.flac`
    audio.current = new Audio(audioPath)
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
