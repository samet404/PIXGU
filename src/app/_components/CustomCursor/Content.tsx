'use client'

import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useRef, useState } from 'react'

export const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null)
    const visibleTimeoutRef = useRef<Timer | null>(null)
    const [isVisible, setisVisible] = useState<boolean>(false)

    const handleMouseClick = () => {
        const cursor = cursorRef.current
        if (!cursor) return

        // Add scale transform and higher opacity on click
        cursor.style.transform = `${cursor.style.transform} scale(0.8)`
        cursor.style.backgroundColor = 'rgba(255,255,255,0.8)'
        cursor.style.boxShadow = '0 0 30px 0 rgba(255,255,255,0.5)'

        // Reset after animation
        setTimeout(() => {
            cursor.style.transform = cursor.style.transform.replace(' scale(0.8)', '')
            cursor.style.backgroundColor = 'rgba(255,255,255,0.2)'
            cursor.style.boxShadow = '0 0 20px 0 rgba(0,0,0,0.3)'
        }, 150)
    }

    const handleMousemove = (e: MouseEvent) => {
        const cursor = cursorRef.current
        if (!cursor) return

        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLCanvasElement) {
            cursor.style.opacity = '0'
            return
        }

        cursor.style.opacity = '1'
        cursor.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`
        if (visibleTimeoutRef.current) clearTimeout(visibleTimeoutRef.current)
        visibleTimeoutRef.current = setTimeout(() => {
            setisVisible(false)
        }, 1000)

        if (!isVisible) setisVisible(true)
    }

    const handleBlur = () => {
        const cursor = cursorRef.current
        if (!cursor) return

        cursor.style.opacity = '0'
    }

    const handleFocus = () => {
        const cursor = cursorRef.current
        if (!cursor) return

        cursor.style.opacity = '1'
    }

    useEffectOnce(() => {
        document.body.addEventListener('mousemove', handleMousemove)
        document.body.addEventListener('mousedown', handleMouseClick)
        window.addEventListener('blur', handleBlur)
        window.addEventListener('focus', handleFocus)

        return () => {
            document.body.removeEventListener('mousemove', handleMousemove)
            document.body.removeEventListener('mousedown', handleMouseClick)
            window.removeEventListener('blur', handleBlur)
            window.removeEventListener('focus', handleFocus)
            if (visibleTimeoutRef.current) clearTimeout(visibleTimeoutRef.current)
        }
    })

    return (
        <div
            ref={cursorRef}
            style={{
                pointerEvents: 'none',
                position: 'fixed',
                opacity: isVisible ? '1' : '0',
                zIndex: 100,
                height: '20px',
                width: '20px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.2)',
                boxShadow: '0 0 20px 0 rgba(0,0,0,0.3)',
                backdropFilter: 'blur(2px)',
                transition: 'transform 150ms ease-out, opacity 350ms ease-out, background-color 150ms ease-out, box-shadow 150ms ease-out',
                willChange: 'transform'
            }}
        />
    )
}

