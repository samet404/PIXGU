'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'
import { useEffectOnce } from 'usehooks-ts'
import { useRef, useState } from 'react'
import { clsxMerge } from '@/utils/clsxMerge'
import { usePathname } from 'next/navigation'

const BackgroundMusicPlayer = () => {
  const audio = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  let pathname = usePathname().replace('/', '')
  if (pathname == '') pathname = 'home'

  const audioPath = `/sound/music/page/${pathname}/background.mp3`

  const play = async () => {
    setIsPlaying(true)
    if (audio.current) await audio.current.play()
  }

  const pause = () => {
    setIsPlaying(false)
    if (audio.current) audio.current.pause()
  }

  useEffectOnce(() => {
    audio.current = new Audio(audioPath)
  })

  const handleOnClick = () => {
    if (isPlaying) {
      pause()
      setIsPlaying(false)
    } else {
      play().catch((e) => console.log(e))
      setIsPlaying(true)
    }
  }

  const availablePages = ['home']

  if (!availablePages.includes(pathname)) return null
  return (
    <div
      onClick={() => handleOnClick()}
      className={clsxMerge(
        'rounded-ful absolute bottom-2 left-2 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tl from-[rgb(189,255,185)] via-[rgb(184,244,255)] to-[rgb(242,255,187)] opacity-60 duration-150 ',
        { 'opacity-30': isPlaying == false },
      )}
    >
      <FontAwesomeIcon icon={faMusic} fill="black" fontSize={22} />
    </div>
  )
}

export default BackgroundMusicPlayer
