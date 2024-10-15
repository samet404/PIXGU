'use client'

import { clsxMerge } from '@/utils/clsxMerge'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

export const Btn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <button
      onClick={() => setIsLoading(true)}
      className={clsxMerge(
        `flex aspect-square h-12 w-12 items-center justify-center rounded-lg bg-[rgb(20,20,20)]  p-1 drop-shadow-[0_0px_2px_#141414]`,
        {
          'scale-90 animate-pulse opacity-50 animate-infinite': isLoading,
        },
      )}
    >
      <FontAwesomeIcon
        icon={faGithub}
        fontSize={45}
        color={'rgba(255,255,255,0.85)'}
      />
    </button>
  )
}
