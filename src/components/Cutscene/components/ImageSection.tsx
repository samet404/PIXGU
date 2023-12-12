'use client'

import { useAtomValue } from 'jotai'
import Image from 'next/image'
import { getCutsceneStageImagePathAtom } from '../atoms'
import { Fragment } from 'react'

const ImageSection = () => {
  const imagePath = useAtomValue(getCutsceneStageImagePathAtom)

  if (imagePath)
    return (
      <Image
        src={imagePath}
        width={1000}
        height={1000}
        sizes="(min-width: 380px) calc(7.79vw + 400px), calc(71.67vw + 170px)"
        className="h-[20rem] w-[20rem] rounded-sm object-contain shadow-[0px_0px_25px_1px_rgba(255,255,255,0.3)]"
        alt="Cutscene Image"
      />
    )
  else return <Fragment></Fragment>
}

export default ImageSection
