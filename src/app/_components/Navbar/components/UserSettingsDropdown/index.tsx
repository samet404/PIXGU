'use client'

import Image from 'next/image'
import { Fragment, useRef, useState } from 'react'
import { Inter } from 'next/font/google'
import { useSetAtom } from 'jotai'
import { switchIsDropdownOpenAtom } from './atoms'
import DropdownContent from './components/DropdownContent'
import { useEffectOnce } from 'usehooks-ts'
import { Session } from 'lucia'

const inter = Inter({
  subsets: ['latin'],
  weight: ['700'],
})

const UserSettingsDropdown = () => {
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  const [session, setSession] = useState<Session | any>()
  useEffectOnce(() => {
    const getSession = async () => {
      const response = await fetch('/api/auth/validate', {
        method: 'GET',
      })

      const data = await response.json()
      setSession(data)
      console.log(data)
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getSession()
  })

  const switchIsDropdownOpen = useSetAtom(switchIsDropdownOpenAtom)

  // if (status === 'loading') {
  //   return (
  //     <div className="flex animate-pulse flex-row items-center gap-2 rounded-3xl bg-[rgba(255,255,255,0.5)] py-[0.2rem] pl-2 pr-[0.2rem] animate-duration-1000 animate-infinite">
  //       <div className={`${inter.className} text-[rgba(0,0,0,0.5)]`}>
  //         ...loading
  //       </div>
  //       <div className="h-10 w-10 rounded-full bg-[rgba(0,0,0,0.2)]"></div>
  //     </div>
  //   )
  // }

  if (session)
    return (
      <div className="relative">
        <div
          onClick={() => switchIsDropdownOpen()}
          className="flex flex-row items-center gap-2 rounded-3xl bg-[rgba(255,255,255,0.5)] py-[0.2rem] pl-2 pr-[0.2rem]"
        >
          <div className={`${inter.className} text-[rgba(0,0,0,0.5)]`}>
            {session.user!.username}
          </div>
          {/* <Image
            src={session.user!.image!}
            alt="profile picture"
            className="h-10 w-10 rounded-full"
            width={100}
            height={100}
          /> */}
        </div>

        <DropdownContent />
      </div>
    )

  return <Fragment></Fragment>
}

export default UserSettingsDropdown
