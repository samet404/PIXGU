'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import YouTubePlayer from 'youtube-player'
import type { YouTubePlayer as YoutubePlayerType } from 'youtube-player/dist/types'
import { useSoundSettings } from '@/zustand/store'
import { Options } from './Options'

export const Player = () => {
    const list = useSoundSettings(s => s.musicLinks)
    const youtubeVidRef = useRef<YoutubePlayerType | null>(null)
    const [ready, retReady] = useState(false)

    useEffect(() => {
        youtubeVidRef.current?.destroy()

        youtubeVidRef.current = YouTubePlayer('video-player', {
            playerVars: { controls: 0, autoplay: 1 },
        })
        const player = youtubeVidRef.current


        // 'loadVideoById' is queued until the player is ready to receive API calls.
        player.loadPlaylist(list)
        player.playVideo()
        player.setVolume(50)
        retReady(true)
    }, [list])


    if (ready) return (
        <Fragment>
            <div className='text-[#ffffffa9] text-sm text-center'> {list.length === 0 ? 'You can add music link in settings > sounds' : null}</div>
            <div
                id="video-player"
                className="aspect-video size-[8rem]  rounded-lg shadow-[0_0px_10px_1px_rgba(0,0,0,0.5)]"
            ></div>
            {youtubeVidRef.current && <Options youtubeVidRef={youtubeVidRef} />}
        </Fragment>
    )
}
