'use client'

import { drawGrid, clearGrid } from '@/helpers/room'
import { Tool } from '../Tool'
import { useEffect } from 'react'
import { useGameToolAlert, usePainterTool } from '@/zustand/store'
import { useShortcut } from '@/hooks/useShortcut'
import { Svg } from '@/components/Svg'

export const GridSwitcher = () => {
  const isOpen = usePainterTool((s) => s.with.grid)
  const switchGrid = usePainterTool((s) => s.switchGrid)
  const setToolAlert = useGameToolAlert((s) => s.setAlert)

  useEffect(() => {
    if (isOpen) {
      clearGrid()
      drawGrid()
    } else clearGrid()
  }, [isOpen])


  useShortcut({
    keyName: 'Grid', onShortcut: () => {
      switchGrid()
      setToolAlert(`Grid ${isOpen ? 'closed' : 'opened'}`)
    }
  })


  return (
    <Tool
      isActive={isOpen}
      icon={
        <Svg src='grid-svgrepo-com.svg' alt="grid" className="h-full w-full opacity-55" />
      }
      onMouseDown={switchGrid}
    />
  )
}
