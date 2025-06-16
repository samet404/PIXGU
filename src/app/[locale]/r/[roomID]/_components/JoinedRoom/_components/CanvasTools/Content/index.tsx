'use client'

import { EyeDropper } from './components/EyeDropper'
import { Trash } from './components/Trash'
import { Bucket } from './components/Bucket'
import { Pencil } from './components/Pencil'
import { Eraser } from './components/Eraser'
import { useGuide } from '@/zustand/store/useGuide'
import { useWhoIsPainterClient } from '@/zustand/store/useWhoIsPainterClient'
import { useEffect, useRef } from 'react'
import { Color } from './components/Color'
import { ColorPicker } from './components/ColorPicker'
import { UndoRedo } from './components/UndoRedo'
import { UndoRedoBtn } from './components/UndoRedoBtn'
import { GridSwitcher } from './components/GridSwitcher'
import { Pin } from './components/Pin'
import { MouseScroll } from './components/MouseScroll'
import { Layers } from './components/Layers'
import { GradientType } from './components/GradientType'
import type { LangObj } from '../../../lang'

export const Content = ({ langObj }: Props) => {
  const whoIsPainter = useWhoIsPainterClient((s) => s.value)
  const mainRef = useRef<HTMLDivElement | null>(null)
  const { changeUR, comingSoon, gradientType, layers } = langObj

  useEffect(() => {
    if (!mainRef.current) return
    if (whoIsPainter.status === 'thereIsNoPainter') return

    if (useGuide.getState().painterTool) useGuide.setState(s => ({ ...s, painterTool: false }))

    mainRef.current.addEventListener('mousemove', (e) => {
      e.preventDefault()
    })

    return () => {
      if (!mainRef.current) return

      mainRef.current.removeEventListener('mousemove', (e) => {
        e.preventDefault()
      })
    }
  }, [])


  return (
    <div ref={mainRef} className="absolute z-40 flex animate-fade-right gap-5 animate-duration-150  rounded-r-lg left-0 top-0 w-[15rem] shadow-[0_0px_40px_10px_rgba(0,0,0,0.5)] h-full flex-col bg-[#1f0236b2] backdrop-blur-md">
      <MouseScroll />
      <div style={
        {
          scrollbarWidth: 'none',
          backgroundImage: 'radial-gradient(at 100% 100%, hsla(0, 0%, 0%, 0.1) 0px, transparent 50%)'
        }
      } className='overflow-y-auto w-full h-full pt-4 pb-20 flex-col gap-4 flex px-5'>
        <div className='flex flex-row justify-end'>
          <Pin />
        </div>
        <div className='w-full grid gap-2 grid-cols-4 grid-flow-row'>
          <Pencil />
          <Eraser />
          <EyeDropper />
          <Bucket />
          <Trash />
          <GridSwitcher />
          {/* <Gradient /> */}
        </div>
        <div className='flex flex-row gap-2'>
          <UndoRedoBtn type='undo' />
          <UndoRedoBtn type='redo' />
        </div>
        <div className='flex flex-col gap-2'>
          <ColorPicker />
          <div className='flex flex-row gap-1'>
            <Color />
            <Color isColor2={true} />
          </div>
        </div>

        <UndoRedo heading={changeUR.heading} type0Text={changeUR.BO} type1Text={changeUR.PBP} />
        <Layers heading={layers.heading} comingSoon={comingSoon} />
        <GradientType heading={gradientType.heading} comingSoon={comingSoon} />
        {/* <Rectangle /> */}
        {/* <Circle /> */}
        {/* <GridSwitcher /> */}
      </div>
    </div>
  )
}

type Props = {
  langObj: LangObj['canvasTools']
}