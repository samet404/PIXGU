'use client'

import { languageAtom } from '@/app/_atoms/atomsWithStorage'
import { useSetAtom } from 'jotai'
import { switchIsDropdownOpenAtom } from '../../../atoms'

type LanguageBtnProps = {
  name: string
}

const LanguageBtn = ({ name }: LanguageBtnProps) => {
  const setLanguage = useSetAtom(languageAtom)
  const switchIsDropdownOpen = useSetAtom(switchIsDropdownOpenAtom)

  const handleOnClick = () => {
    setLanguage(name)
    switchIsDropdownOpen()
  }

  return (
    <button
      onClick={() => handleOnClick()}
      className="rounded-md bg-[rgba(0,0,0,0.3)] p-1 text-[rgba(255,255,255,0.5)]"
    >
      {name}
    </button>
  )
}

export default LanguageBtn
