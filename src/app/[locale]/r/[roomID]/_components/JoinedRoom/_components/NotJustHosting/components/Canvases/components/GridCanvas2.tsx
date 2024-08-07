'use client'

import { useAtomValue } from 'jotai'
import { clsxMerge } from '@/utils/clsxMerge'
import { isGridOpenAtom } from '../../atoms'
import { useEffectOnce } from '@/hooks'
import { useRef } from 'react'

export const GridCanvas2 = () => {
  const isOpen = useAtomValue(isGridOpenAtom)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffectOnce(() => {
    canvasRef.current!.height = canvasRef.current!.width * 1

    window.addEventListener('resize', () => {
      canvasRef.current!.height = canvasRef.current!.width * 1
    })
  })

  return (
    <canvas
      ref={canvasRef}
      id="grid-canvas-2"
      className={clsxMerge(
        'absolute bottom-0 left-0 right-0 top-0 z-20 inline-block w-full rounded-lg',
        {
          hidden: !isOpen,
        },
      )}
    />
  )
}
