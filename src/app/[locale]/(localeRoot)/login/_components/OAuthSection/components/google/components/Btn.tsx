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
        `flex aspect-square h-12 w-12 items-center justify-center rounded-lg bg-[#ffffff]  p-1 shadow-[0_0px_10px_0px_rgba(0,0,0,0.8)] drop-shadow-2xl`,
        {
          'scale-90 animate-pulse opacity-50 animate-infinite': isLoading,
        },
      )}
    >
      <Image src={googleIcon} alt="google icon" sizes="lorem ipsum" />
    </button>
  )
}
