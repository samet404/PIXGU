'use client'

import { clsxMerge } from '@/utils/clsxMerge'
import { useState } from 'react'
import { useTimeout } from 'usehooks-ts'

const AnimatedDiv = () => {
  const [isActive, setIsActive] = useState<boolean>(false)

  useTimeout(() => setIsActive(true), 50)

  return (
    <div
      style={{
        backgroundColor: 'hsla(204, 100%, 11%, 1)',
        backgroundImage:
          'radial-gradient(at 100% 100%, hsla(182, 100%, 50%, 0.215) 0px, transparent 50%), radial-gradient(at 2% 0%, hsla(193, 100%, 50%, 0.255) 0px, transparent 50%)',
      }}
      className={clsxMerge(
        'absolute h-full w-full flex-col opacity-0 duration-1000',
        {
          'opacity-100': isActive,
        },
      )}
    ></div>
  )
}
export default AnimatedDiv
