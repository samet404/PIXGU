'use client'

import { useGuide, } from '@/zustand/store/useGuide'
import { useWhoIsPainterClient } from '@/zustand/store/useWhoIsPainterClient'
import dynamic from 'next/dynamic'

const Content = dynamic(() => import('./Content').then(m => m.Content))

export const PainterToolGuide = ({ text }: Props) => {
    const isOpen = useGuide(s => s.painterTool)
    const amIPainter = useWhoIsPainterClient(s => s.value.amIPainter)

    if (isOpen && amIPainter) return <Content text={text} />
}

type Props = {
    text: string
}