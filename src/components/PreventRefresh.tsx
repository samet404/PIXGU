'use client'

import { env } from '@/env/client'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import type { PropsWithChildren } from 'react'

export const PreventRefresh = ({ children }: PropsWithChildren) => {
    useEffectOnce(() => {
        if (env.NEXT_PUBLIC_NODE_ENV === 'development') return

        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault()
            return "Dude, are you sure you want to leave? Think of the kittens!"
        }

        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    })

    return children
}