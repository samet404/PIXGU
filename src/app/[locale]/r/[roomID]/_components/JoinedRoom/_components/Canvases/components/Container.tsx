'use client'

import { clsxMerge } from '@/utils/clsxMerge'
import { usePlayersPowerups, usePowerups, useWhoIsPainterClient } from '@/zustand/store'
import type { PropsWithChildren } from 'react'

export const Container = ({ children }: PropsWithChildren) => {
    // TODO remember s.powerups.rotate.running is undefined

    const myRotatePowerup = usePowerups(s => s.runningPowerups.rotate)
    const rotatePowerup = usePlayersPowerups(s => s.runningPowerups.rotate)
    const myMirrorPowerup = usePowerups(s => s.runningPowerups.mirror)
    const mirrorPowerup = usePlayersPowerups(s => s.runningPowerups.mirror)
    const isRotating = myRotatePowerup || rotatePowerup.IDs.length !== 0
    const amIPainter = useWhoIsPainterClient(s => s.value.amIPainter)
    const scaleX = (() => {
        const totalMirrors = (myMirrorPowerup ? 1 : 0) + mirrorPowerup.IDs.length
        if (totalMirrors % 2 === 0)
            return 1
        return -1
    })()

    console.log('myRotatePowerup: ', myRotatePowerup)
    console.log('rotatePowerup: ', rotatePowerup)
    console.log('myMirrorPowerup: ', myMirrorPowerup)
    console.log('mirrorPowerup: ', mirrorPowerup)
    console.log('isRotating: ', isRotating)
    console.log('scaleX: ', scaleX)

    return (
        <div className="relative flex items-center w-full h-full justify-center">
            <div
                style={{
                    transform: `scaleX(${scaleX})`
                }}
                className={clsxMerge(`relative flex select-none items-center justify-center cursor rounded-[0.7rem] border-[0.2rem] border-[#ffffff37]`, {
                    'animate-slow-spin': isRotating,
                    'cursor-crosshair': amIPainter,
                })}>
                {children}
            </div>
        </div>
    )

}