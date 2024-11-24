'use client'

import { Tool } from '../Tool'
import { usePainterTool } from '@/zustand/store'
import { Svg } from '@/components/Svg'

export const Bucket = () => {
  const toolName = usePainterTool((s) => s.current)
  const setTool = usePainterTool((s) => s.setCurrent)

  return (
    <Tool
      isActive={toolName === 'bucket'}
      onMouseDown={() => setTool('bucket')}
      icon={<Svg src='bucket-svgrepo-com.svg' alt="eye-dropper" className="opacity-50 size-10" />}
    />
  )
}
