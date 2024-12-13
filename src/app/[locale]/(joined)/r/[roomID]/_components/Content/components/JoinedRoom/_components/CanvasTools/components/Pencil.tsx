'use client'

import { Tool } from './Tool'
import { usePainterTool } from '@/zustand/store'
import { Svg } from '@/components/Svg'

export const Pencil = () => {
  const toolName = usePainterTool((s) => s.current)
  const setTool = usePainterTool((s) => s.setCurrent)

  return (
    <Tool
      isActive={toolName === 'pencil'}
      onMouseDown={() => setTool('pencil')}
      icon={<Svg src='/pencil-svgrepo-com.svg' alt="eye-dropper" className="size-9 opacity-50" />}
    />
  )
}
