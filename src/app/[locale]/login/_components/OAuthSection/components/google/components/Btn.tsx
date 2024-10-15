import { clsxMerge } from '@/utils/clsxMerge'
import { useState } from 'react'
import googleIcon from '@/svg/google-svgrepo-com.svg'
import Image from 'next/image'

export const Btn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <button
      onClick={() => setIsLoading(true)}
      className={clsxMerge(
        `flex aspect-square h-12 w-12 items-center  justify-center rounded-lg bg-[#ffffff] p-1 drop-shadow-[0_0px_2px_rgba(255,255,255,0.55)]`,
        {
          'scale-90 animate-pulse opacity-50 animate-infinite': isLoading,
        },
      )}
    >
      <Image src={googleIcon} alt="google icon" sizes="lorem ipsum" />
    </button>
  )
}
