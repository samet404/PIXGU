'use client'

import { useAtomValue } from 'jotai'
import { selectedPanelItemAtom } from '../../atom'
import { clsxMerge } from '@/utils/clsxMerge'
import type { PropsWithChildren } from 'react'
import { usePlayersPowerups, usePowerups } from '@/zustand/store'

export const CanvasWrapper = ({ children }: PropsWithChildren) => {
    const rotatePowerup = usePlayersPowerups(s => s.runningPowerups.rotate)
    const selectedItem = useAtomValue(selectedPanelItemAtom)
    const mirrorPowerup = usePowerups(s => s.powerups.mirror.running)

    console.log('mirrorPowerup: ', mirrorPowerup)

    return (
        <div className={clsxMerge('w-[90%] flex items-center justify-center', {
            'hidden animate-fade': selectedItem !== 'Canvas',
            'animate-slow-spin': rotatePowerup.IDs.length !== 0,
            '-scale-x-[1]': mirrorPowerup
        })}>{children}</div>
    )
}