"use client"

import { useControls } from '@/zustand/store'
import { useEffect, useRef, type PropsWithChildren } from 'react'

export const Shortcut = ({ children }: PropsWithChildren) => {
    const lifetimeInterval = useRef<ReturnType<typeof setInterval> | null>(null)
    const addToQueue = useControls(s => s.addToQueue)
    const clearQueue = useControls(s => s.clearQueue)
    const lifetimeStartedAt = useRef<number | null>(null)
    const isAvailable = useRef<boolean>(false)

    const clear = () => {
        const interval = lifetimeInterval.current
        if (interval) clearInterval(interval)

        lifetimeStartedAt.current = null
        lifetimeInterval.current = null
        isAvailable.current = true
        clearQueue()
    }

    const setLifetime = () => {
        lifetimeInterval.current = setInterval(() => {
            const passedMs = Date.now() - lifetimeStartedAt.current!

            if (passedMs < 5000) return

            clear()
        }, 50)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        const notRight = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement
        if (notRight) return

        e.preventDefault()
        console.log('handlekeydown')

        const queue = useControls.getState().queue
        if (!isAvailable.current) return

        if (queue[queue.length - 1] === e.key.toUpperCase()) {
            return
        }

        if (!lifetimeInterval.current) {
            addToQueue(e.key.toUpperCase())
            lifetimeStartedAt.current = Date.now()
            setLifetime()
        }
        else {
            addToQueue(e.key.toUpperCase())
            lifetimeStartedAt.current = Date.now()
        }

        console.log('queue: ', useControls.getState().queue)
    }

    const handleKeyUp = () => {
        clear()
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('keyup', handleKeyUp)

        return () => {
            clear()
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    return children
}