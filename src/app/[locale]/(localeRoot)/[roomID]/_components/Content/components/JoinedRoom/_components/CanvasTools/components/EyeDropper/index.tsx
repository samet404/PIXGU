'use client'

import Image from 'next/image'
import { Tool } from '../Tool'
import eyeDropper from '@/svg/color-picker-svgrepo-com.svg'
import { usePainterTool } from '@/zustand/store/usePainterTool'

export const EyeDropper = () => {
  const toolName = usePainterTool((s) => s.current)
  const setTool = usePainterTool((s) => s.setCurrent)

  return (
    <Tool
      isActive={toolName === 'eyedropper'}
      onMouseDown={() => setTool('eyedropper')}
      icon={<Image src={eyeDropper} alt="eye-dropper" className="opacity-50" />}
    />
  )
}
