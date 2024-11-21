"use client"

import { useMatchStatusClient, useWhoIsPainterClient } from '@/zustand/store'
import { Button } from './Button'

export const LetterHint = () => {
    const matchStatus = useMatchStatusClient((s) => s.status)
    const painterStatus = useWhoIsPainterClient((s) => s.value)

    const isDisabled = () => {
        if (matchStatus !== 'started') return true
        if (painterStatus.status !== 'currentPainter') return true
        if (painterStatus.amIPainter) return true

        return false
    }

    return <Button name='letterHint' isDisabled={isDisabled()} />

}