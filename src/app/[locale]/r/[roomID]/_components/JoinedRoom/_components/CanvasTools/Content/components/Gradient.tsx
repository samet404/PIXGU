import { Tool } from './Tool'
import { usePainterTool } from '@/zustand/store/usePainterTool'
import { Svg } from '@/components/Svg'

export const Gradient = () => {
    const toolName = usePainterTool((s) => s.current)
    const setTool = usePainterTool((s) => s.setCurrent)

    return (
        <Tool
            isActive={toolName === 'gradient'}
            onMouseDown={() => setTool('gradient')}
            icon={
                <Svg src='gradient-svgrepo-com.svg' alt="gradient" className="h-full w-full opacity-55" />
            }
        />
    )
}