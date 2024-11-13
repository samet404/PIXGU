'use client'

import { useBrokenUserPfps } from '@/zustand/store'
import Image from 'next/image'
import { useState } from 'react'
import dynamic from 'next/dynamic'

const Default = dynamic(() =>
  import('./components/Default').then((m) => m.Default),
)

export const Img = ({ ID, src }: Props) => {
  const [hasError, setHasError] = useState<boolean>(false)
  const isPfpBroken = useBrokenUserPfps((state) => state.isBroken)

  if (hasError) useBrokenUserPfps.getState().add(ID)

  if (isPfpBroken(ID) || hasError || !src)
    return (
      <div className="flex items-center justify-center rounded-full border-[0.2rem] border-[#ffffff6b]  bg-[#ffffff67]">
        <Default />
      </div>
    )
  if (!isPfpBroken(ID) && !hasError && src)
    return (
      <div className="flex items-center justify-center rounded-full border-[0.2rem] border-[#ffffff6b] bg-[#ffffff67]">
        <Image
          src={src}
          width={200}
          height={200}
          alt="pfp"
          sizes="sizes"
          onError={() => setHasError(true)}
          className={'size-12 rounded-full'}
        />
      </div>
    )
}

type Props = {
  ID: string
  src: string | null
}
