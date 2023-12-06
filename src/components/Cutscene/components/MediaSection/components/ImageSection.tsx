'use client'

import { useAtomValue } from 'jotai'
import Image from 'next/image'
import { cutsceneImagePathAtom } from '../../../atoms'

const CutsceneImage = () => {
  const cutsceneImagePath = useAtomValue(cutsceneImagePathAtom)

  return (
    <Image
      src={cutsceneImagePath}
      alt="Cutscene image"
      placeholder="blur"
      className="h-52 w-52"
    />
  )
}

export default CutsceneImage
