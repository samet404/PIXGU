"use client"

import { useEffectOnce } from '@/hooks/useEffectOnce'
import type { PropsWithChildren } from 'react'

export const PreventRefresh = ({ children }: PropsWithChildren) => {
    useEffectOnce(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault()
            return "Dude, are you sure you want to leave? Think of the kittens!"
        }

        window.addEventListener('beforeunload', handleBeforeUnload)
    })

    return children
}