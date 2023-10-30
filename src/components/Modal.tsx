'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import type { ReactNode } from 'react'

const Modal = ({ children }: { children: ReactNode }) => {
    const router = useRouter()

    useEffect(() => {
        const keyDownHandler = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault()
                router.back()
            }
        }
        document.addEventListener('keydown', keyDownHandler)

        return () => document.removeEventListener('keydown', keyDownHandler)
    }, [])

    return (
        <div className="absolute z-50 h-full w-full bg-[rgba(0,0,0,0.4)]">
            {children}
        </div>
    )
}

export default Modal
