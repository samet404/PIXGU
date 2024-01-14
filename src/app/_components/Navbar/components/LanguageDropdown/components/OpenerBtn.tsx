'use client'

import { useAtomValue, useSetAtom } from 'jotai'
import { switchIsDropdownOpenAtom } from '../atoms'
import { Inter } from 'next/font/google'
import { languageAtom } from '@/src/app/_atoms/atomsWithStorage'

const inter = Inter({
  subsets: ['latin'],
  weight: ['600'],
})

const OpenerBtn = () => {
  const switchIsDropdownOpen = useSetAtom(switchIsDropdownOpenAtom)
  const language = useAtomValue(languageAtom)

  if (language)
    return (
      <button
        onClick={() => switchIsDropdownOpen()}
        className={`${inter.className} rounded-md bg-[rgba(255,255,255,0.5)] px-3 py-1`}
      >
        {language}
      </button>
    )
  return (
    <div
      className={`${inter.className} rounded-md bg-[rgba(255,255,255,0.5)] px-3 py-1`}
    >
      ...
    </div>
  )
}

export default OpenerBtn
