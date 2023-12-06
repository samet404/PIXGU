'use client'
import { useAtomValue } from 'jotai'
import { cutsceneVideoPathAtom } from '../../../atoms'
import ReactPlayer from 'react-player'

const VideoSection = () => {
  const cutsceneVideoPath = useAtomValue(cutsceneVideoPathAtom)

  return <ReactPlayer />
}

export default VideoSection
