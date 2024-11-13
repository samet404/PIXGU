"use client"

import { usePainterTool } from '@/zustand/store'
import { Tool } from '../Tool'
import eraser from '@/svg/eraser-svgrepo-com.svg'
import Image from 'next/image'

export const Eraser = () => {
    const toolName = usePainterTool((s) => s.current)
    const setTool = usePainterTool((s) => s.setCurrent)

    return <Tool
        isActive={toolName === 'eraser'}
        onMouseDown={() => setTool('eraser')}
        icon={<Image src={eraser} alt="eraser" className="opacity-50" />}
    />
}