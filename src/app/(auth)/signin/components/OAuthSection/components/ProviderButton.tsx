'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { type ComponentProps } from 'react'

type ProviderButtonType = {
  name: string
  id: string
} & ComponentProps<'button'>

const ProviderButton = ({ name, id }: ProviderButtonType) => {
  const bgColor = (() => {
    switch (name) {
      case 'GitHub':
        return 'bg-[rgb(20,20,20)]'
      case 'Spotify':
        return 'bg-[#1CD45E]'
      case 'Discord':
        return 'bg-[#5865F2]'
      default:
        return ''
    }
  })()

  return (
    <button
      className={`${bgColor} flex aspect-square items-center justify-center rounded-lg border-[0.1rem] border-white opacity-80 shadow-[0_0px_10px_0px_rgba(0,0,0,0.8)] drop-shadow-2xl`}
      onClick={() => signIn(id)}
    >
      <Image
        src={`https://authjs.dev/img/providers/${id}.svg`}
        alt={`${name} oauth image`}
        width={40}
        height={40}
      />
    </button>
  )
}

export default ProviderButton
