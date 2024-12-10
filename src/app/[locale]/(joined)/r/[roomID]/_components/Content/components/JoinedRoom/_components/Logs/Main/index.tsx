"use client"

import dynamic from 'next/dynamic'
import { isOpenAtom } from '../atoms'
import { useAtomValue } from 'jotai'
import Spinner from '@/components/Spinner'

const Content = dynamic(() => import('./Content').then(m => m.Content), {
    loading: () => <div className='w-full h-full flex items-center justify-center'>
        <Spinner />
    </div>
})

export const Main = () => {
    const isOpen = useAtomValue(isOpenAtom)

    if (isOpen) return <div
        style={{
            scrollbarWidth: 'none'
        }}
        className="flex overflow-y-scroll flex-col gap-2 h-[10rem] p-2 bg-[#ffffff1e] rounded-md">
        <Content />
    </div>
}