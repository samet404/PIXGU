"use client"

import { useSetAtom } from 'jotai'
import { isClosedAtom } from './atoms'
import { useRef, useState } from 'react'
import { useEffectOnce } from '@/hooks/useEffectOnce'
import { clsxMerge } from '@/utils/clsxMerge'

export const Timer = () => {
    const setClosed = useSetAtom(isClosedAtom)
    const intervalStartedAt = useRef<number | null>(null)
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const [ready, setReady] = useState(false)
    const [remaining, setRemaining] = useState(5)

    useEffectOnce(() => {
        intervalStartedAt.current = Date.now()
        intervalRef.current = setInterval(() => {
            const passedMs = Date.now() - intervalStartedAt.current!
            console.log('passedMs: ', passedMs)
            if (passedMs >= 5000) {
                setReady(true)
                clearInterval(intervalRef.current!)
            } else {
                setRemaining(5 - passedMs / 1000)
            }
        }, 1000)

        return () => {
            clearInterval(intervalRef.current!)
        }
    })

    return (
        <div className="flex flex-row gap-2 items-center">
            <div className={clsxMerge('flex flex-row gap-3', {
                'cursor-not-allowed opacity-55': !ready
            })}>
                <button
                    disabled={!ready}
                    onMouseDown={() => setClosed(true)}
                    className="animate-fade hover:opacity-80 rounded-md bg-white px-2 py-1 text-black"
                >
                    Okay
                </button>
                <button
                    disabled={!ready}
                    onMouseDown={() => {
                        localStorage.setItem('small-screen-alert', 'false')
                        setClosed(true)
                    }}
                    className="animate-fade rounded-md hover:opacity-80 bg-white px-2 py-1 text-black"
                >
                    Don't show again
                </button>
            </div>

            {
                !ready && <div className='text-white'>
                    {remaining.toFixed(0)}

                </div>
            }
        </div>
    )
}