'use client'

import { useClickAway } from '@uidotdev/usehooks'
import { isDropdownOpenAtom } from '../../atoms'
import { useAtomValue } from 'jotai'

const DropdownContent = () => {
  const isDropdownOpen = useAtomValue(isDropdownOpenAtom)

  const DropdownContentRef = useClickAway<HTMLDivElement>(() => {
    false
  })

  if (isDropdownOpen)
    return (
      <div
        ref={DropdownContentRef}
        className="absolute bottom-0 left-0 right-0 animate-fade animate-duration-300 animate-once"
      >
        <div className="absolute right-0 top-2 z-20 flex  h-auto w-32 flex-row gap-2 rounded-md bg-[rgba(255,255,255,0.9)] p-2  shadow-[0_0px_30px_-1px_rgba(255,255,255,0.5)] backdrop-blur-2xl"></div>
      </div>
    )
}

export default DropdownContent
