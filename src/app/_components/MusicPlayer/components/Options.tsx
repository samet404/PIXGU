'use client'

import { type MutableRefObject, useRef } from 'react'
import type { YouTubePlayer } from 'youtube-player/dist/types'
import './styles/sound-slider.css'
import Image from 'next/image'
import soundImg from '@/png/icons8-sound-48.png'

export const Options = ({ youtubeVidRef }: Props) => {
  const soundSliderRef = useRef<HTMLInputElement | null>(null)

  const handleOnInput = () => {
    if (!youtubeVidRef.current) return null

    youtubeVidRef.current.setVolume(
      parseInt(soundSliderRef.current?.value ?? '0'),
    )
  }

  return (
    <div className="flex w-[8rem] flex-row items-center gap-2">
      <Image src={soundImg} alt="sound-icon" className="size-4 opacity-40" />
      <div className="grow">
        <input
          id="sound-slider"
          ref={soundSliderRef}
          onInput={handleOnInput}
          type="range"
          min="0"
          max="100"
        />
      </div>
    </div>
  )
}

type Props = {
  youtubeVidRef: MutableRefObject<YouTubePlayer | null>
}
