'use client'

import { Tool } from '../Tool'
import { usePainterTool } from '@/zustand/store/usePainterTool'
import { Svg } from '@/components/Svg'

export const EyeDropper = () => {
  const toolName = usePainterTool((s) => s.current)
  const setTool = usePainterTool((s) => s.setCurrent)

  return (
    <Tool
      isActive={toolName === 'eyedropper'}
      onMouseDown={() => setTool('eyedropper')}
      icon={<Svg src='color-picker-svgrepo-com.svg' alt="eye-dropper" className="size-10 opacity-50" />}
    />
  )
}
