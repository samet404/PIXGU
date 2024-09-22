'use client'

import pfp from '@/png/pfp2.png'
import { clsxMerge } from '@/utils/clsxMerge'
import Image from 'next/image'
import { useState } from 'react'

export const Default = ({ className, sizes }: Props) => {
  const [loaded, setLoaded] = useState<boolean>(false)

  return (
    <Image
      src={pfp}
      alt="default_pfp"
      sizes={sizes}
      onLoad={() => setLoaded(true)}
      onError={() => console.error('Error loading default pfp')}
      className={clsxMerge(`${className}`, {
        'animate-pulse': !loaded,
      })}
    />
  )
}

type Props = {
  className: string
  sizes: string
}
