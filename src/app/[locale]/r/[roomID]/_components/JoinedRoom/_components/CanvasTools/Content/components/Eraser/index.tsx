'use client'

import { usePainterTool } from '@/zustand/store'
import { Tool } from '../Tool'
import { Svg } from '@/components/Svg'

export const Eraser = () => {
    const toolName = usePainterTool((s) => s.current)
    const setTool = usePainterTool((s) => s.setCurrent)

    return <Tool
        isActive={toolName === 'eraser'}
        onMouseDown={() => setTool('eraser')}
        icon={<Svg src='eraser-svgrepo-com.svg' alt="eraser" className="opacity-50 size-8" />}
    />
}