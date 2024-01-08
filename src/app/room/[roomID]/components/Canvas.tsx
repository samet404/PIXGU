'use client'

import { useCanvasDraw } from '@/hooks/useCanvasDraw'
import { useAtomValue } from 'jotai'
import { useRef } from 'react'
import { canvasColorAtom } from './atoms'

const Canvas = () => {
  const draftCanvasRef = useRef<HTMLCanvasElement>(null)
  const mainCanvasRef = useRef<HTMLCanvasElement>(null)
  const canvasColor = useAtomValue(canvasColorAtom)

  const { mouseOut, mouseDown, mouseMove, mouseUp } = useCanvasDraw(
    draftCanvasRef,
    mainCanvasRef,
    canvasColor,
  )

  return (
    <div className="relative rounded-lg bg-[#ffffff68] p-2 shadow-[0_0px_13px_0px_rgba(0,0,0,0.4)] ">
      <div className="w-full rounded-md bg-white">
        <canvas
          ref={mainCanvasRef}
          width={600}
          height={600}
          className="rounded-lg"
        />
        <div className="absolute left-0 top-0 p-2">
          <canvas
            onMouseOut={mouseOut}
            onMouseDown={mouseDown}
            onMouseUp={mouseUp}
            onMouseMove={mouseMove}
            width={600}
            height={600}
            ref={draftCanvasRef}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  )
}

export default Canvas
