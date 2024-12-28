import { useAtomValue } from 'jotai'
import { openPanelAtom } from '../atoms'
import { getLangObj } from './lang'
import type { Locale } from '@/types/locale'
import dynamic from 'next/dynamic'

const Content = dynamic(() => import('./Content').then(m => m.Content))

export const Powerups = async ({ locale }: Params) => {
    const langObj = await getLangObj(locale)
    const openPanel = useAtomValue(openPanelAtom)

    if (openPanel === 'power-ups') return <Content langObj={langObj} />
}

type Params = {
    locale: Locale
}