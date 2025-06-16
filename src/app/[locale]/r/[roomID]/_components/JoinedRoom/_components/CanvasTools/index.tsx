"use client"

import { useAtomValue } from 'jotai'
import { isCanvasToolsOpenAtom } from '../atoms'
import { useWhoIsPainterClient } from '@/zustand/store/useWhoIsPainterClient'
import dynamic from 'next/dynamic'
import { AlphaLoading } from '@/components/AlphaLoading'
import type { LangObj } from '../../lang'

const Content = dynamic(() => import('./Content').then(m => m.Content), {
    loading: () => <AlphaLoading />
})

export const CanvasTools = ({ langObj }: Props) => {
    const whoIsPainter = useWhoIsPainterClient((s) => s.value)
    const isOpen = useAtomValue(isCanvasToolsOpenAtom)

    if (
        whoIsPainter.status !== 'thereIsNoPainter'
        && whoIsPainter.amIPainter
        && isOpen
    ) return <Content langObj={langObj} />
}

type Props = {
    langObj: LangObj['canvasTools']
}