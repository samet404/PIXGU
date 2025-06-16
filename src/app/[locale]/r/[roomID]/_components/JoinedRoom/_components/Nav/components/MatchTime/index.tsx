'use client'

import { useWhoIsPainterClient } from '@/zustand/store/useWhoIsPainterClient'
import { Info } from './components/Info'
import { RemainTime } from './components/RemainTime'
import { useAtom } from 'jotai'
import { themeAtom } from './atom'
import { clsxMerge } from '@/utils/clsxMerge'
import { useEffect } from 'react'
import type { LangObj } from '../../../../lang'

export const MatchTime = ({ langObj }: Props) => {
    const matchStatus = useWhoIsPainterClient((s) => s.value.status)
    const [theme, setTheme] = useAtom(themeAtom)

    useEffect(() => {
        if (matchStatus === 'selectedTheme') return
        setTheme(null)
    }, [matchStatus])

    if (matchStatus === 'selectedTheme') return (
        <div className={clsxMerge('flex relative cursor-wait group flex-row bg-[rgba(255,255,255,0.20)] items-center gap-1 rounded-full px-3 py-[0.35rem] text-[#ffffff84] text-[0.9rem] leading-3   duration-[2000ms]', {
            'text-[#ff4451b3]': theme === 'red',
        })}>
            <RemainTime displayMinuteText={langObj.remainTime.minutes} displaySecondText={langObj.remainTime.seconds} />
            <Info langObj={langObj.info} />
        </div>
    )
}


type Props = {
    langObj: LangObj['nav']['matchTime']
}