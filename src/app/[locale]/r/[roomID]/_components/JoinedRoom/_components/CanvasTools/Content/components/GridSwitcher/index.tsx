'use client'

import { drawGrid, clearGrid } from '@/helpers/room'
import { Tool } from '../Tool'
import { useEffect } from 'react'
import { usePainterTool } from '@/zustand/store/usePainterTool'
import { Svg } from '@/components/Svg'

export const GridSwitcher = () => {
  const isOpen = usePainterTool((s) => s.with.grid)
  const switchGrid = usePainterTool((s) => s.switchGrid)

  useEffect(() => {
    if (isOpen) {
      clearGrid()
      drawGrid()
    } else clearGrid()
  }, [isOpen])

  return (
    <Tool
      isActive={isOpen}
      icon={
        <Svg src='grid-svgrepo-com.svg' alt="grid" className="size-9 opacity-50" />
      }
      onMouseDown={switchGrid}
    />
  )
}
