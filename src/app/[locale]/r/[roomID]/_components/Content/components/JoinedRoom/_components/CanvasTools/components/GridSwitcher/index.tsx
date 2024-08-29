'use client'

import { drawGrid } from '@/utils/room/drawGrid'
import { Tool } from '../Tool'
import { useEffect, useState } from 'react'
import { clearGrid } from '@/utils/room/clearGrid'
import gridIcon from '@/svg/grid-svgrepo-com.svg'
import Image from 'next/image'

export const GridSwitcher = () => {
  const [isOpen, setIsOpen] = useState<boolean>(
    localStorage.getItem('grid') === 'true' ? true : false,
  )

  useEffect(() => {
    localStorage.setItem('grid', isOpen ? 'true' : 'false')
    if (isOpen) drawGrid()
    else clearGrid()
  }, [isOpen])

  return (
    <Tool
      icon={
        <Image src={gridIcon} alt="grid" className="h-full w-full opacity-55" />
      }
      className="bg-[#ffffff46] text-gray-500"
      classNameConditions={{ 'bg-[#ffffff59]': isOpen }}
      onClick={() => {
        setIsOpen(!isOpen)
      }}
    ></Tool>
  )
}
