'use client'

import { type MutableRefObject, useRef } from 'react'
import type { YouTubePlayer } from 'youtube-player/dist/types'
import './styles/sound-slider.css'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useSoundSettings } from '@/zustand/store/useSoundSettings'
import { More } from './More'

export const Options = ({ youtubeVidRef }: Props) => {
  const soundSliderRef = useRef<HTMLInputElement | null>(null)
  const setVolume = useSoundSettings((s) => s.setMusicSoundLevel)

  useEffectOnce(() => {
    if (!soundSliderRef.current || !youtubeVidRef.current) return

    soundSliderRef.current.value = useSoundSettings.getState().musicSoundLevel
    youtubeVidRef.current.setVolume(
      parseInt(soundSliderRef.current.value),
    )
  })

  const handleOnInput = () => {
    if (!youtubeVidRef.current || !soundSliderRef.current) return

    youtubeVidRef.current.setVolume(
      parseInt(soundSliderRef.current.value),
    )

    setVolume(soundSliderRef.current?.value)
  }

  return (
    <div className="flex w-[8rem] flex-row items-center gap-2">
      <div className="grow">
        <input
          id="music-player-sound-slider"
          ref={soundSliderRef}
          onInput={handleOnInput}
          type="range"
          min="0"
          max="100"
        />
      </div>

      <More />
    </div>
  )
}

type Props = {
  youtubeVidRef: MutableRefObject<YouTubePlayer | null>
}
