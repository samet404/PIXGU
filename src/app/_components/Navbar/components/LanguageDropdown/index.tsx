'use client'

import { useLocalStorage } from '@/src/hooks/useLocalStorage'
import { useClickAway } from '@uidotdev/usehooks'
// fonts
import { Inter } from 'next/font/google'
import { useState } from 'react'
import LanguageBtn from './components/LanguageBtn'
import { useEffectOnce } from 'usehooks-ts'

const inter = Inter({
  subsets: ['latin'],
  weight: ['600'],
})

const BtnLanguage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const [language, setLanguage] = useLocalStorage('language', 'TR')
  const [hasWindow, setHasWindow] = useState<boolean>(false)
  useEffectOnce(() => {
    setHasWindow(true)
  })

  const dropdownRef = useClickAway<HTMLDivElement>(() => {
    setIsDropdownOpen(false)
  })

  const handleLanguageBtnClick = (language: string) => {
    setLanguage(language)
    setIsDropdownOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`${inter.className} rounded-md bg-[rgba(255,255,255,0.5)] px-3 py-1`}
      >
        {hasWindow && language}
      </button>

      {isDropdownOpen && (
        <div className="absolute bottom-0 left-0 right-0 animate-fade animate-duration-300 animate-once">
          <div className="absolute right-0 top-2 z-20 grid  h-auto w-32 grid-cols-2 gap-2 rounded-md bg-[rgba(255,255,255,0.7)] p-2  shadow-[0_0px_30px_-1px_rgba(255,255,255,0.5)] backdrop-blur-2xl">
            <LanguageBtn
              name="TR"
              onClick={() => handleLanguageBtnClick('TR')}
            />
            <LanguageBtn
              name="US"
              onClick={() => handleLanguageBtnClick('US')}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default BtnLanguage
