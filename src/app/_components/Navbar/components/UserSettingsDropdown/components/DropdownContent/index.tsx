'use client'

import { useClickAway } from '@uidotdev/usehooks'
import { isDropdownOpenAtom } from '../../atoms'
import { useAtomValue } from 'jotai'
import DropdownContentItem from './components/DropdownContentItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGear } from '@fortawesome/free-solid-svg-icons'

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
        <div className="absolute right-0 top-2 z-20 flex  h-auto w-52 flex-row gap-2 rounded-md bg-[rgba(255,255,255,0.7)] p-2  shadow-[0_0px_30px_-1px_rgba(255,255,255,0.5)] backdrop-blur-2xl">
          <div className="z-0 absolute right-0 top-0 h-full w-full rounded-md  bg-gradient-to-tl from-[rgba(189,255,185,0.2)] via-[rgba(184,244,255,0.2)] to-[rgba(242,255,187,0.2)] "></div>
          <DropdownContentItem
            logo={
              <FontAwesomeIcon
                icon={faUserGear}
                color="rgba(255,255,255,0.7)"
                fontSize={30}
              />
            }
            text="Account settings"
            link="/settings/account"
          />
        </div>
      </div>
    )
}

export default DropdownContent
