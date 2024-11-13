"use client"

import { useSoundSettings } from '@/zustand/store'
import { SettingsCheckbox } from '../../_components/SettingsCheckbox'

export const Music = () => {
    const isMusicOpen = useSoundSettings((s) => s.music)
    const toggleMusic = useSoundSettings((s) => s.toggleMusic)

    return (
        <SettingsCheckbox name="Music player" description='Your own music player. Only available in one tab in the browser.' isChecked={isMusicOpen} onMouseDown={toggleMusic} />
    )
}