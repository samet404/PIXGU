import { clsxMerge } from '@/utils/clsxMerge'
import { useAtomValue } from 'jotai'
import type { PropsWithChildren } from 'react'
import { isMinimizedAtom } from '../atoms'

export const MinimizedPlayer = ({ children }: PropsWithChildren) => {
    const isMinimized = useAtomValue(isMinimizedAtom)

    return (
        <div className={clsxMerge('z-50 flex select-none animate-fade flex-col gap-1 drop-shadow-[0_0px_2px_rgba(0,0,0,0.55)]', {
            'hidden': isMinimized
        })}>
            {children}
        </div>
    )
}

