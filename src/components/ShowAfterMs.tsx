'use client'

import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useState, type PropsWithChildren } from 'react'

export const ShowAfterMs = ({ ms, children }: Props) => {
    const [display, setDisplay] = useState<boolean>(false)

    useEffectOnce(() => {
        const timeout = setTimeout(() => {
            setDisplay(true)
        }, ms)

        return () => {
            clearTimeout(timeout)
        }
    })

    if (display) return children
}

type Props = {
    ms: number
} & PropsWithChildren