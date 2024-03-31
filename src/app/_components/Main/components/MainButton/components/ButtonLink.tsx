'use client'

import { clsxMerge } from '@/utils/clsxMerge'
import Link from 'next/link'
import { type ReactNode, useState } from 'react'

type ButtonLinkProps = {
  href: string
  children: ReactNode
}

const ButtonLink = ({ href, children }: ButtonLinkProps) => {
  const [isLoading, setisLoading] = useState(false)

  return (
    <Link
      href={href}
      className={clsxMerge('none cursor-none select-none', {
        'animate-pulse': isLoading == true,
      })}
      onClick={() => {
        console.log('dsajdp')
        console.log(isLoading)
        setisLoading(true)
      }}
    >
      {children}
    </Link>
  )
}

export default ButtonLink
