'use client'

import { useClickAway } from '@uidotdev/usehooks'
import LanguageBtn from './components/LanguageBtn'
import { useAtomValue } from 'jotai'
import { isDropdownOpenAtom } from '../../atoms'

const DropdownContent = () => {
  const DropdownContentRef = useClickAway<HTMLDivElement>(() => {
    false
  })
  const isDropdownOpen = useAtomValue(isDropdownOpenAtom)

  if (isDropdownOpen)
    return (
      <div
        ref={DropdownContentRef}
        className="absolute bottom-0 left-0 right-0 animate-fade animate-duration-300 animate-once"
      >
        <div className="absolute right-0 top-2 z-20 grid  h-auto w-32 grid-cols-2 gap-2 rounded-md bg-[rgba(255,255,255,0.7)] p-2  shadow-[0_0px_30px_-1px_rgba(255,255,255,0.5)] backdrop-blur-2xl">
          <LanguageBtn name="TR" />
          <LanguageBtn name="EN" />
        </div>
      </div>
    )
}

export default DropdownContent
