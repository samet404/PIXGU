"use client"

import { useAtom, useSetAtom } from 'jotai'
import { useEffect, useRef } from 'react'
import { alertAtom, recordingAtom } from './atoms'
import { useControls } from '@/zustand/store'
import { useEffectOnce } from '@/hooks/useEffectOnce'

export const RecordBinding = () => {
    const lifeTimeInterval = useRef<ReturnType<typeof setInterval> | null>(null)
    const lifetimeStartedAt = useRef<number | null>(null)
    const recordingRef = useRef<typeof recording>(null)
    const [recording, setRecording] = useAtom(recordingAtom)
    const setAlert = useSetAtom(alertAtom)

    const setBind = () => {
        const recording = recordingRef.current
        if (!recording) return

        lifetimeStartedAt.current = null
        if (recording.value.length > 0) {
            const result = useControls.getState().setKey(recording.key, recording.value)
            if (result) setAlert(result)
        }
        setRecording(null)
        clearInterval(lifeTimeInterval.current!)
    }

    useEffect(() => {
        recordingRef.current = recording
    }, [recording])

    console.log('record: ', recording)
    const keydown = (e: KeyboardEvent) => {
        const recording = recordingRef.current
        console.log(e.key.toUpperCase(), recording)
        if (!recording) return
        if (recording.value[recording.value.length - 1] === e.key.toUpperCase()) return
        e.preventDefault()

        if (recording.value.length === 3) {
            setBind()
            return
        }

        if (!lifetimeStartedAt.current) {
            setAlert(null)

            lifetimeStartedAt.current = Date.now()
            lifeTimeInterval.current = setInterval(() => {
                const passedMs = Date.now() - lifetimeStartedAt.current!

                if (passedMs < 3000) return
                setBind()

            }, 50)
        }

        setRecording({
            key: recording.key,
            value: [...recording.value, e.key.toUpperCase()]
        })
    }

    const keyup = (e: KeyboardEvent) => {
        const recording = recordingRef.current
        console.log('keyup: ', e.key.toUpperCase(), recording)
        if (!recording) return
        e.preventDefault()

        setBind()

    }

    useEffectOnce(() => {
        document.addEventListener('keydown', keydown)
        document.addEventListener('keyup', keyup)

        return () => {
            document.removeEventListener('keydown', keydown)
            document.removeEventListener('keyup', keyup)
        }
    })

    return null
}