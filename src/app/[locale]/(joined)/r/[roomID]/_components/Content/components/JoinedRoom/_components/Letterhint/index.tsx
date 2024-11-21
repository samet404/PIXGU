"use client"

import { useLetterHint } from '@/zustand/store'
import dynamic from 'next/dynamic'

const Content = dynamic(() => import('./Content').then((m) => m.Content))

export const LetterHint = () => {
    const data = useLetterHint((s) => s.letters)

    if (data[0]) return <Content data={data} />
}
