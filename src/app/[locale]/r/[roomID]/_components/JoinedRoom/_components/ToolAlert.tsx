"use client"

import { useGameToolAlert } from '@/zustand/store'
import { useEffect, useRef } from 'react'

export const ToolAlert = () => {
    const alert = useGameToolAlert((s) => s.text)
    const setAlert = useGameToolAlert((s) => s.setAlert)
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const intervalStartedAt = useRef<number | null>(null)

    const runClearInterval = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }
        intervalRef.current = null
        intervalStartedAt.current = null
    }

    useEffect(() => {
        if (!alert) return
        runClearInterval()

        intervalStartedAt.current = Date.now()
        intervalRef.current = setInterval(() => {
            const passedMs = Date.now() - intervalStartedAt.current!
            if (passedMs >= 2500) {
                runClearInterval()
                setAlert(null)
            }
        }, 50)

        return () => {
            runClearInterval()
            // setAlert(null)
        }
    }, [alert])

    if (alert)
        return (
            <div className='select-none pointer-events-none w-full bottom-0 left-0 p-2 z-40 flex absolute items-center justify-center'>
                <div className='bg-[#ffffffd5] px-2 py-1 text-[#000000b1] text-[0.7rem] text-center rounded-md'>
                    {alert}
                </div>
            </div>
        )
}