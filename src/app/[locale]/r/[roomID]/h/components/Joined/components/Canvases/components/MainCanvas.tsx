'use client'

import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useHostCanvasesData } from '@/zustand/store/useHostCanvasesData'
import { useRef } from 'react'

export const MainCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const cellSideCount = useHostCanvasesData.getState().get().cellSideCount

    useEffectOnce(() => {
        if (!canvasRef.current) return

        const canvas = canvasRef.current
        const mctx = canvas.getContext('2d')!

        if (!canvasRef.current) return

        mctx.fillStyle = 'white'
        mctx.fillRect(0, 0, canvas.width, canvas.height)


        useHostCanvasesData.getState().add({
            mctx,
            main: canvasRef.current,
            cellPixelLength: canvasRef.current.width / cellSideCount,
        })
    })

    return (
        <canvas
            ref={canvasRef}
            width={480}
            height={480}
            style={{
                imageRendering: 'pixelated',
            }}
            id="main-canvas"
            className="rounded-lg z-10"
        />
    )
}
