'use client'

import Image from 'next/image'
import { Tool } from '../Tool'
import eyeDropper from '@/svg/color-picker-svgrepo-com.svg'
import { useIsEyeDropperOpen } from '@/zustand/store'

export const EyeDropper = () => {
  const isOpen = useIsEyeDropperOpen((s) => s.isOpen)
  const toggle = useIsEyeDropperOpen((s) => s.toggle)

  return (
    <Tool
      classNameConditions={{
        'bg-[#ffffff82]': isOpen,
      }}
      onClick={toggle}
      icon={<Image src={eyeDropper} alt="eye-dropper" className="opacity-50" />}
    />
  )
}
