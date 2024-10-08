'use client'

import Image from 'next/image'
import { useState } from 'react'

export const Img = ({ src }: Props) => {
  const [hasError, setHasError] = useState<boolean>(false)

  if (hasError || !src)
    import('@/png/pfp2.png').then((m) => {
      return (
        <Image
          src={m}
          width={200}
          height={200}
          alt="pfp"
          sizes="sizes"
          onError={() => console.error('Error loading default pfp')}
          className={'size-24 rounded-full'}
        />
      )
    })

  if (src)
    return (
      <Image
        src={src}
        width={200}
        height={200}
        alt="pfp"
        sizes="sizes"
        onError={() => setHasError(true)}
        className={'size-24 rounded-full'}
      />
    )
}

type Props = {
  src: string | null
}
