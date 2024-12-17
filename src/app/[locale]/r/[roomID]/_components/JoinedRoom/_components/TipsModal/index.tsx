"use client"

import { useEffectOnce } from '@/hooks/useEffectOnce'
import dynamic from 'next/dynamic'
import Spinner from '@/components/Spinner'
import { useAtom } from 'jotai'
import { showTipsModalAtom } from './Content/atoms'

const Content = dynamic(() => import('./Content').then(m => m.Content), {
    loading: () => <div className='absolute z-30 top-0 left-0 w-full h-full items-center justify-center'>
        <Spinner />
    </div>
})

export const TipsModal = () => {
    const [showTips, setShowTips] = useAtom(showTipsModalAtom)

    useEffectOnce(() => {
        if (localStorage.getItem('showTips') !== '1') setShowTips(true)
    })

    if (showTips) return <Content />
}