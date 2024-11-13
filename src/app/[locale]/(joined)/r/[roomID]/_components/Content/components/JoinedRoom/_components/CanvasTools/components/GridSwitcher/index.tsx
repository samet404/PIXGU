'use client'

import { drawGrid, clearGrid } from '@/helpers/room'
import { Tool } from '../Tool'
import { useEffect } from 'react'
import { usePainterTool } from '@/zustand/store'
import gridIcon from '@/svg/grid-svgrepo-com.svg'
import Image from 'next/image'

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
        <Image src={gridIcon} alt="grid" className="h-full w-full opacity-55" />
      }
      onMouseDown={switchGrid}
    />
  )
}
