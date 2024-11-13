'use client'

import pfp from '@/png/pfp2.png'
import Image from 'next/image'

export const Default = () => {
  return (
    <Image
      src={pfp}
      alt="pfp"
      sizes="sizes"
      onError={() => console.error('Error loading default pfp')}
      className={'size-12 rounded-full'}
    />
  )
}
