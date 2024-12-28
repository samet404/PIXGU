"use client"

import { useAtomValue } from 'jotai'
import { selectedPanelItemAtom } from '../../atom'
import { clsxMerge } from '@/utils/clsxMerge'
import type { PropsWithChildren } from 'react'
import { usePlayersPowerups, usePowerups } from '@/zustand/store'

export const CanvasWrapper = ({ children }: PropsWithChildren) => {
    const myRotatePowerup = usePowerups(s => s.powerups.rotate.running)
    const rotatePowerup = usePlayersPowerups(s => s.runningPowerups.rotate)
    const selectedItem = useAtomValue(selectedPanelItemAtom)
    const mirrorPowerup = usePowerups(s => s.powerups.mirror.running)
    const myMirrorPowerup = usePowerups(s => s.powerups.mirror.running)

    return (
        <div className={clsxMerge('w-[90%] flex items-center justify-center', {
            'hidden': selectedItem !== 'Canvas',
            'animate-fade': selectedItem === 'Canvas',
            'animate-infinite animate-spin animate-duration-[10000ms]': myRotatePowerup || rotatePowerup,
            '-scale-x-[1]': myMirrorPowerup || mirrorPowerup
        })}>{children}</div>
    )
}