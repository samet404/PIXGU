'use client'

import { useRef } from 'react'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useHostCanvasesData } from '@/zustand/store'

export const DraftCanvas = ({ name, code }: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const cellSideCount = useHostCanvasesData.getState().get().cellSideCount

    useEffectOnce(() => {
        const ctx = canvasRef.current!.getContext('2d')!

        // disabled antialiasing
        ctx.imageSmoothingEnabled = false

        useHostCanvasesData.getState().add({
            [`d${code}ctx`]: ctx,
            cellPixelLength: canvasRef.current!.width / cellSideCount,
            [`draft_${name}`]: canvasRef.current,
        })
    })

    return (
        <canvas
            width={480}
            height={480}
            ref={canvasRef}
            id={`draft-${name}-canvas`}
            style={{
                imageRendering: 'pixelated',
            }}
            className="absolute bottom-0 left-0 right-0 top-0 z-30 rounded-lg"
        />
    )
}

type Props = {
    name: string
    code: string
}