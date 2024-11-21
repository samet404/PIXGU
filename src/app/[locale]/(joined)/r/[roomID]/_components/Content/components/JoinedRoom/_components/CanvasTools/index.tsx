"use client"

import { EyeDropper } from './components/EyeDropper'
import { Trash } from './components/Trash'
import { Bucket } from './components/Bucket'
import { Pencil } from './components/Pencil'
import { Eraser } from './components/Eraser'
import { useWhoIsPainterClient } from '@/zustand/store'
import { isCanvasToolsOpenAtom } from '../atoms'
import { useAtomValue } from 'jotai'
import { useEffect, useRef } from 'react'
import { Color } from './components/Color'
import { ColorPicker } from './components/ColorPicker'
import { UndoRedo } from './components/UndoRedo'


const CanvasTools = () => {
  const whoIsPainter = useWhoIsPainterClient((s) => s.value)
  const isOpen = useAtomValue(isCanvasToolsOpenAtom)
  const mainRef = useRef<HTMLDivElement | null>(null)


  useEffect(() => {
    if (!mainRef.current) return
    if (whoIsPainter.status === 'thereIsNoPainter') return

    mainRef.current.addEventListener('mousemove', (e) => {
      e.preventDefault()
    })

    return () => {
      if (!mainRef.current) return

      mainRef.current!.removeEventListener('mousemove', (e) => {
        e.preventDefault()
      })
    }
  }, [isOpen])

  if (whoIsPainter.status === 'thereIsNoPainter') return null
  if (whoIsPainter.amIPainter)
    if (isOpen) return (
      <div ref={mainRef} style={
        {
          backgroundImage: 'radial-gradient(at 100% 100%, hsla(0, 0%, 0%, 0.1) 0px, transparent 50%)'
        }
      } className="absolute z-40 animate-fade-right gap-5 py-7 px-4 animate-duration-150 overflow-y-auto rounded-r-[2rem] left-0 top-0 flex w-[15rem] shadow-[0_0px_40px_10px_rgba(0,0,0,0.5)] h-full flex-col bg-[#1f0236b2] backdrop-blur-md">
        <div className='w-full grid gap-2 grid-cols-4 grid-flow-row'>
          <Pencil />
          <Eraser />
          <EyeDropper />
          <Bucket />
          <Trash />
          {/* <Gradient /> */}
        </div>
        <div className='flex flex-col gap-2'>
          <ColorPicker />
          <div className='flex flex-row gap-1'>
            <Color />
            <Color isColor2={true} />
          </div>
        </div>

        <UndoRedo />
        {/* <Rectangle /> */}
        {/* <Circle /> */}
        {/* <GridSwitcher /> */}
      </div>
    )
}

export default CanvasTools
