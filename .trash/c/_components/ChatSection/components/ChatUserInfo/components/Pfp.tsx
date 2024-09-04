'use client'

import { useAtomValue } from 'jotai'
import Image from 'next/image'
import { selectedUserInfoPfpAtom } from '@/app/c/atoms'

const Pfp = () => {
  const pfp = useAtomValue(selectedUserInfoPfpAtom)

  if (!pfp)
    return (
      <div className="size-[3rem] animate-pulse rounded-full bg-[#494949]"></div>
    )

  return (
    <Image
      width={20}
      height={20}
      src={pfp}
      alt="profile_picture"
      sizes="(min-width: 720px) 54px, (min-width: 420px) calc(11.43vw - 27px), (min-width: 340px) calc(11.67vw - 27px), calc(10vw - 22px)"
      className="size-[3rem] animate-fade rounded-full border-[0.2rem] border-[#494949] bg-gray-400 shadow-[0_0px_10px_1px_rgba(0,0,0,0.3)]"
    ></Image>
  )
}
export default Pfp
