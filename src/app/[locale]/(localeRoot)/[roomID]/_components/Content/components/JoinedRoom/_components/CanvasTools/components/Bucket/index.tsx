'use client'

import Image from 'next/image'
import { Tool } from '../Tool'
import bucket from '@/svg/bucket-svgrepo-com.svg'
import { usePainterTool } from '@/zustand/store'

export const Bucket = () => {
  const toolName = usePainterTool((s) => s.current)
  const setTool = usePainterTool((s) => s.setCurrent)

  return (
    <Tool
      isActive={toolName === 'bucket'}
      onMouseDown={() => setTool('bucket')}
      icon={<Image src={bucket} alt="eye-dropper" className="opacity-50" />}
    />
  )
}
