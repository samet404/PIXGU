'use client'

import dynamic from 'next/dynamic'
import Spinner from '@/components/Spinner'
import { useGuide } from '@/zustand/store/useGuide'
import { useWhoIsPainterClient } from '@/zustand/store/useWhoIsPainterClient'

const Content = dynamic(() => import('./Content').then(m => m.Content), {
    loading: () => <div className='absolute z-30 top-0 left-0 w-full h-full items-center justify-center'>
        <Spinner />
    </div>
})

export const TipsModal = () => {
    const status = useWhoIsPainterClient(s => s.value.status)
    const isOpen = useGuide((s) => s.first)

    if (isOpen && status !== 'thereIsNoPainter') return <Content />
}