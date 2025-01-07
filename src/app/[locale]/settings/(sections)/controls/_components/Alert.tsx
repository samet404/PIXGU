'use client'

import { useAtom } from 'jotai'
import { useEffect, useRef } from 'react'
import { alertAtom } from '../atoms'
import { clsxMerge } from '@/utils/clsxMerge'

export const Alert = () => {
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const intervalStartedAt = useRef<number | null>(null)
    const [alert, setAlert] = useAtom(alertAtom)

    console.log('alert: ', alert)
    const clear = () => {
        const interval = intervalRef.current

        if (interval) clearInterval(interval)
        setAlert(null)
        intervalRef.current = null
        intervalStartedAt.current = null

    }

    useEffect(() => {
        if (!alert) return
        // clear()

        intervalStartedAt.current = Date.now()
        intervalRef.current = setInterval(() => {
            const elapsed = Date.now() - intervalStartedAt.current!

            if (elapsed < 3000) return

            clear()
        }, 100)

        return clear
    }, [alert])



    if (alert)
        return <div className='absolute flex z-30 bottom-4 left-0 w-full items-center justify-center animate-fade-up'>
            <div className={clsxMerge('text-rose-100 bg-gradient-to-tr  rounded-md px-2 py-1 text-lg', {
                'from-rose-500 to-rose-600': alert.type === 'error',
                'from-yellow-500 to-yellow-600': alert.type === 'warning',
            })}>
                {alert.type}: {alert.text}
            </div>
        </div>
}