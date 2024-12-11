"use client"

import { useEffectOnce } from '@/hooks/useEffectOnce'
import { postMsgToCanvasWorker } from '@/workers'
import { useState } from 'react'


export const BlurFocus = () => {
    const [hasBlur, setHasBlur] = useState(false)

    const Blur = () => {
        postMsgToCanvasWorker({
            e: 'blur'
        })
        setHasBlur(true)
    }

    const Focus = () => {
        postMsgToCanvasWorker({
            e: 'focus'
        })
        setHasBlur(false)
    }

    useEffectOnce(() => {
        window.addEventListener('blur', Blur)
        window.addEventListener('focus', Focus)

        return () => {
            window.removeEventListener('blur', Blur)
            window.removeEventListener('focus', Focus)
        }
    })

    if (hasBlur) return <div className='animate-fade-blur absolute z-30 pointer-events-none backdrop-blur-3xl rounded-md w-full h-full items-center justify-center text-center flex flex-col gap-4 leading-3 text-white font-[700]'>
        <div className='drop-shadow-[0_0px_10px_rgba(0,0,0,0.4)] text-[2rem]'>
            Canvas paused
        </div>
        <div className='drop-shadow-[0_0px_20px_rgba(0,0,0,0.8)] text-[1rem]'>
            due to browser limitations
        </div>
    </div>
}