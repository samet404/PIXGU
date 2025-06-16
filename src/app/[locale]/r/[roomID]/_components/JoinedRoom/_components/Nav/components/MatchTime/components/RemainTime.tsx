"use client"

import { useMatchStatusClient } from '@/zustand/store/useMatchStatusClient'
import { useSetAtom } from 'jotai'
import { Fragment, useEffect } from 'react'
import { themeAtom } from '../atom'

export const RemainTime = ({ displayMinuteText, displaySecondText }: Props) => {
    const remainSeconds = useMatchStatusClient((s) => s.remainSeconds)
    const setTheme = useSetAtom(themeAtom)

    useEffect(() => {
        if (remainSeconds === 30) setTheme('red')
    }, [remainSeconds])

    if (remainSeconds) return <Fragment>
        <div>
            {Math.floor(remainSeconds / 60)}{displayMinuteText}
        </div>
        <div>
            {remainSeconds % 60}{displaySecondText}
        </div>
    </Fragment>
}

type Props = {
    displayMinuteText: string
    displaySecondText: string
}