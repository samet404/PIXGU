'use client'
import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })
import { useAtomValue } from 'jotai'
import { getCutsceneStageVideoPathAtom } from '../atoms'
import { Fragment } from 'react'

const VideoSection = () => {
  const videoPath = useAtomValue(getCutsceneStageVideoPathAtom)

  if (videoPath)
    return <ReactPlayer controls={true} playing={true} loop={true}  url={videoPath} />
  else return <Fragment></Fragment>
}

export default VideoSection
