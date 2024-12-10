"use client"

import { Svg } from '@/components/Svg'
import { useAtom } from 'jotai'
import { isOpenAtom } from './atoms'
import { clsxMerge } from '@/utils/clsxMerge'

export const DropdownBtn = () => {
    const [isOpen, setIsOpen] = useAtom(isOpenAtom)

    return (
        <button
            className={clsxMerge('size-6 font-[600] flex w-full bg-[#ffffff2e] rounded-md flex-row gap-1 items-center justify-center py-4')}
            onMouseDown={() => setIsOpen(!isOpen)}
        >
            <Svg src='paper-fold-text-svgrepo-com.svg' className='opacity-35 size-6' alt='Logs' />
            <div className='text-[#ffffff7b]'>
                {isOpen ? 'Hide' : 'Show'} Logs
            </div>
        </button>
    )
}