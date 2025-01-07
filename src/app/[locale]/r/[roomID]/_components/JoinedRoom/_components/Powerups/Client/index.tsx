'use client'

import dynamic from 'next/dynamic'
import type { LangObj } from '../lang'
import { useCurrentPanel } from '@/zustand/store'

const Content = dynamic(() => import('./Content').then(m => m.Content))

export const Client = ({ langObj }: Params) => {
    const currentPanel = useCurrentPanel(s => s.currentPanel)

    if (currentPanel === 'power-ups') return <Content langObj={langObj} />
}

type Params = {
    langObj: LangObj
}