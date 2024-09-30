'use client'

import Image from 'next/image'
import { Tool } from './Tool'
import pencil from '@/svg/pencil-svgrepo-com.svg'
import { usePainterTool } from '@/zustand/store'

export const Pencil = () => {
  const toolName = usePainterTool((s) => s.current)
  const setTool = usePainterTool((s) => s.setCurrent)

  return (
    <Tool
      isActive={toolName === 'pencil'}
      onMouseDown={() => setTool('pencil')}
      icon={<Image src={pencil} alt="eye-dropper" className="opacity-50" />}
    />
  )
}
