'use client'

import { useClickAway } from '@uidotdev/usehooks'
import LanguageBtn from './components/LanguageBtn'
import { useAtomValue } from 'jotai'
import { isDropdownOpenAtom } from '../../atoms'
import { clsxMerge } from '@/utils/clsxMerge'

const DropdownContent = () => {
  const DropdownContentRef = useClickAway<HTMLDivElement>(() => {
    false
  })
  const isDropdownOpen = useAtomValue(isDropdownOpenAtom)

  return (
    <div
      ref={DropdownContentRef}
      className={clsxMerge(
        'absolute bottom-0 left-0 right-0 flex animate-fade animate-duration-300 animate-once',
        {
          hidden: !isDropdownOpen,
        },
      )}
    >
      <div className="absolute right-[0] top-2 z-20  grid h-auto w-32 grid-cols-2 gap-2 rounded-md border-b-[0.2rem] border-b-[#888888] bg-[rgb(205,205,205)] p-2  shadow-[0_0px_30px_-1px_rgba(255,255,255,0.5)] backdrop-blur-2xl">
        <LanguageBtn locale="tr" />
        <LanguageBtn locale="en" />
        <LanguageBtn locale="esi" />
      </div>
    </div>
  )
}

export default DropdownContent
