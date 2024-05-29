'use client'

import { useEffect, useRef } from 'react'
import { Options } from './components/Options'
import YouTubePlayer from 'youtube-player'
import type { YouTubePlayer as YoutubePlayerType } from 'youtube-player/dist/types'
import { useAtomValue } from 'jotai'
import { musicAtom } from '../../_atoms/atomsWithStorage'

const playlist = [
  'SODYQmix4h0',
  '2taAeB6CbtI',
  'ZKBKJ9DmOhs',
  'QiblLmQ4258',
  'JjT0p2z4hGgb',
]

export const MusicPlayer = () => {
  const isMusicOpen = useAtomValue(musicAtom)
  const youtubeVidRef = useRef<YoutubePlayerType | null>(null)

  useEffect(() => {
    if (isMusicOpen) {
      youtubeVidRef.current = YouTubePlayer('video-player', {
        playerVars: { controls: 0, autoplay: 1 },
      })

      const player = youtubeVidRef.current

      // 'loadVideoById' is queued until the player is ready to receive API calls.
      player.loadPlaylist(playlist)
      player.playVideo()
      player.setVolume(50)
    }

    if (!isMusicOpen)
      if (youtubeVidRef.current) youtubeVidRef.current?.destroy()
  }, [isMusicOpen])

  if (!isMusicOpen) return null

  return (
    <div
      className={
        'absolute bottom-2 left-2 z-50 flex animate-fade flex-col gap-1 drop-shadow-[0_0px_2px_rgba(0,0,0,0.55)]'
      }
    >
      <div
        id="video-player"
        className="aspect-video size-[8rem]  rounded-lg shadow-[0_0px_10px_1px_rgba(0,0,0,0.5)]"
      ></div>
      <Options youtubeVidRef={youtubeVidRef} />
    </div>
  )
}
