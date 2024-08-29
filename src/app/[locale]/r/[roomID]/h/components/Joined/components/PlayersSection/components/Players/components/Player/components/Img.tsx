'use client'

import { useBrokenPlayersPfp } from '@/zustand/store'
import Image from 'next/image'
import { useState } from 'react'

export const Img = ({ ID, src }: Props) => {
  const [hasError, setHasError] = useState<boolean>(false)
  const isPfpBroken = useBrokenPlayersPfp((state) => state.isBroken)

  if (hasError) useBrokenPlayersPfp.getState().add(ID)

  if ((src && isPfpBroken(ID)) || hasError || !src)
    import('@/png/pfp2.png').then((m) => {
      return (
        <Image
          src={m}
          alt="pfp"
          sizes="sizes"
          onError={() => console.error('Error loading default pfp')}
          className={'size-16 rounded-full border-[0.2rem] border-[#ffffff9d]'}
        />
      )
    })

  if (!isPfpBroken(ID) && !hasError && src)
    return (
      <Image
        src={src}
        width={200}
        height={200}
        alt="pfp"
        sizes="sizes"
        onError={() => setHasError(true)}
        className={'size-16 rounded-full border-[0.2rem] border-[#ffffff9d]'}
      />
    )
}

type Props = {
  ID: string
  src: string | null
}
