'use client'

import { Svg } from '@/components/Svg'
import { clsxMerge } from '@/utils/clsxMerge'
import { useAtom } from 'jotai'
import { isCanvasToolsPinnedAtom } from '../../../atoms'

export const Pin = () => {
    const [enabled, setEnabled] = useAtom(isCanvasToolsPinnedAtom)

    return <Svg onMouseDown={() => setEnabled(!enabled)} className={clsxMerge('size-6 cursor-pointer opacity-50', {
        'opacity-80': enabled
    })} src='pin-fill-svgrepo-com.svg' alt='pin' />
}