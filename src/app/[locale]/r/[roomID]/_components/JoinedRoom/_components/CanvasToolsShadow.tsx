"use client"

import { useAtom } from 'jotai'
import { useState, useEffect } from 'react'
import { isCanvasToolsOpenAtom } from './atoms'
import { useMatchStatusClient, useWhoIsPainterClient } from '@/zustand/store'

const REM_TO_PX = 16 // 1rem = 16px by default
const TOOLS_WIDTH = 20 * REM_TO_PX // 30rem in pixels
const TRIGGER_WIDTH = 10 * REM_TO_PX // 10rem for initial trigger

export const CanvasToolsShadow = () => {
    const amIPainter = useWhoIsPainterClient(s => s.value.amIPainter)
    const gameStatus = useMatchStatusClient(s => s.status)
    const [opacity, setOpacity] = useState(0)
    const [isToolsOpen, setIsToolsOpen] = useAtom(isCanvasToolsOpenAtom)

    useEffect(() => {

        const handleMouseMove = (e: MouseEvent) => {
            if (gameStatus !== 'started') return
            if (!amIPainter) return
            const mouseX = e.clientX

            if (mouseX < TOOLS_WIDTH) {
                const normalizedPosition = mouseX / TOOLS_WIDTH
                const newOpacity = Math.max(0, Math.min(0.8, 1 - normalizedPosition))
                setOpacity(newOpacity)
            } else {
                setOpacity(0)
            }

            const shouldOpen = isToolsOpen ? mouseX < TOOLS_WIDTH : mouseX < TRIGGER_WIDTH
            if (shouldOpen !== isToolsOpen) setIsToolsOpen(shouldOpen)
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [isToolsOpen, setIsToolsOpen, gameStatus, amIPainter])

    if (gameStatus === 'started') return (
        <div
            className="absolute animate-fade z-40 top-0 left-0 h-full pointer-events-none"
            style={amIPainter ? {
                width: '30rem',
                background: `linear-gradient(90deg, 
                    rgba(0,0,0,${opacity}) 0%,
                    rgba(0,0,0,0) 100%
                )`,
                transition: 'background 0.1s ease-out'
            } : {
                display: 'none'
            }}
        >
        </div>
    )
}
