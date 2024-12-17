"use client"

import { useAtomValue } from 'jotai'
import { selectedPanelItemAtom } from '../../atom'
import { clsxMerge } from '@/utils/clsxMerge'
import type { PropsWithChildren } from 'react'

export const CanvasWrapper = ({ children }: PropsWithChildren) => {
    const selectedItem = useAtomValue(selectedPanelItemAtom)

    return (
        <div className={clsxMerge('w-[90%] flex items-center justify-center', {
            'hidden': selectedItem !== 'Canvas',
            'animate-fade': selectedItem === 'Canvas',
        })}>{children}</div>
    )
}