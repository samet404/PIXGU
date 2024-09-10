'use client'

import pfp from '@/png/pfp2.png'
import Image from 'next/image'

export const Default = ({ className, sizes }: Props) => {
  return (
    <Image
      src={pfp}
      alt="default_pfp"
      sizes={sizes}
      onError={() => console.error('Error loading default pfp')}
      className={className}
    />
  )
}

type Props = {
  className: string
  sizes: string
}
