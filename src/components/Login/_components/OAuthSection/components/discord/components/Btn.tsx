import { clsxMerge } from '@/utils/clsxMerge'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

export const Btn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <button
      onClick={() => setIsLoading(true)}
      className={clsxMerge(
        `flex size-12 items-center justify-center rounded-lg p-1`,
        {
          'animate-pulse opacity-50 animate-infinite': isLoading,
        },
      )}
    >
      <FontAwesomeIcon
        icon={faDiscord}
        className='!w-full !h-full'
        color={'rgba(255,255,255,0.85)'}
      />
    </button>
  )
}
