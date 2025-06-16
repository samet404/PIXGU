'use client'

import { useBrokenUserPfps } from '@/zustand/store/useBrokenUserPfps'
import { useState, type ComponentProps } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import type { OverrideProps } from '@/types/overrideProps'
import { clsxMerge } from '@/utils/clsxMerge'

const Default = dynamic(() =>
  import('./components/Default').then((m) => m.Default),
)

export const UserPfp = ({
  ID,
  src,
  width,
  height,
  className,
  sizes,
  alt,
  ...rest
}: Props) => {
  const [loaded, setLoaded] = useState<boolean>(false)
  const [hasError, setHasError] = useState<boolean>(false)
  const isPfpBroken = useBrokenUserPfps.getState().isBroken
  if (hasError) useBrokenUserPfps.getState().add(ID)

  if (isPfpBroken(ID) || hasError || !src)
    return <Default className={className} sizes={sizes} />

  if (!isPfpBroken(ID) && !hasError && src)
    return (
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setHasError(true)}
        className={clsxMerge(`${className}`, {
          'animate-pulse': !loaded,
        })}
        sizes={sizes}
        {...rest}
      />
    )
}

type Props = OverrideProps<
  ComponentProps<'img'>,
  {
    ID: string
    src: string | null | undefined
    width: number
    height: number
    className: string
    sizes: string
    alt: string
  }
>
