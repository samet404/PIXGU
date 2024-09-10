'use client'

import { useSetAtom } from 'jotai'
import { switchIsDropdownOpenAtom } from '../atoms'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['600'],
})

const OpenerBtn = ({ lang }: Props) => {
  const switchIsDropdownOpen = useSetAtom(switchIsDropdownOpenAtom)

  return (
    <button
      onClick={() => switchIsDropdownOpen()}
      className={`${inter.className} rounded-md bg-[rgba(255,255,255,0.5)] px-3 py-1`}
    >
      {lang.toUpperCase()}
    </button>
  )
}

export default OpenerBtn

type Props = {
  lang: string
}
