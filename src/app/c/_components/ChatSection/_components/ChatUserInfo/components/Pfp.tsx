'use client'

import { useAtomValue } from 'jotai'
import Image from 'next/image'
import { userInfoPfpAtom } from '@/app/c/atoms'

const Pfp = () => {
  const pfp = useAtomValue(userInfoPfpAtom)

  if (!pfp) return <div className='bg-gray-400" size-[3rem] rounded-full'></div>

  return (
    <Image
      width={20}
      height={20}
      src={pfp}
      alt="profile_picture"
      className="size-[3rem] rounded-full border-[0.2rem] border-white bg-gray-400 shadow-[0_0px_10px_1px_rgba(0,0,0,0.3)]"
    ></Image>
  )
}
export default Pfp
