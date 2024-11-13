"use client"

import Spinner from '@/components/Spinner'
import { useAtomValue } from 'jotai'
import { refreshAlertAtom } from './atoms'

export const RefreshAlert = () => {
    const isOpen = useAtomValue(refreshAlertAtom)

    if (isOpen) return (
        <div className='absolute z-[90] animate-fade flex flex-row backdrop-blur-lg items-center bg-[#0000005e] text-white gap-2 left-0 top-0 px-2 py-1 shadow-lg'>
            Refreshing <Spinner className='size-5' />
        </div>
    )
}