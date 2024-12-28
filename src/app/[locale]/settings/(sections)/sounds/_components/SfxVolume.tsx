"use client"

import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useSoundSettings } from '@/zustand/store'
import { useRef } from 'react'

export const SfxVolume = ({ title }: Props) => {
    const setSfxVolume = useSoundSettings((s) => s.setSfxSoundLevel)
    const rangeRef = useRef<HTMLInputElement>(null)

    useEffectOnce(() => {
        if (!rangeRef.current) return
        rangeRef.current.value = useSoundSettings.getState().sfxSoundLevel
    })

    const onInput = () => {
        if (!rangeRef.current) return

        const value = rangeRef.current.value
        setSfxVolume(value)
    }

    return (
        <div className='text-[#000000b1]'>
            {title}
            <input ref={rangeRef} onInput={onInput} type="range" min="0" max="100" className="sound-range w-full" />
        </div>
    )
}

type Props = {
    title: string
}
