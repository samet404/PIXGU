'use client'

import { useAtomValue } from 'jotai'
import { clsxMerge } from '@/utils/clsxMerge'
import { isGridOpenAtom } from '../../atoms'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useRef } from 'react'
import { useCanvasesMainData } from '@/zustand/store'

export const GridCanvas = () => {
  const isOpen = useAtomValue(isGridOpenAtom)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffectOnce(() => {
    if (!canvasRef.current) return

    canvasRef.current.width = canvasRef.current.height
    useCanvasesMainData.getState().add({
      grid: canvasRef.current,
    })

    window.addEventListener('resize', () => {
      if (!canvasRef.current) return
      canvasRef.current.height = canvasRef.current.width
    })

    return () => {
      window.removeEventListener('resize', () => {
        if (!canvasRef.current) return
        canvasRef.current.height = canvasRef.current.width
      })
    }
  })

  return (
    <canvas
      ref={canvasRef}
      id="grid-canvas"
      className={clsxMerge(
        'absolute bottom-0 left-0 right-0 top-0 z-30 h-full rounded-lg',
        {
          hidden: !isOpen,
        },
      )}
    />
  )
}
