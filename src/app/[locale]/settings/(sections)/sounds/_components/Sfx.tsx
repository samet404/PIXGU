'use client'

import { useSoundSettings } from '@/zustand/store/useSoundSettings'
import { SettingsCheckbox } from '../../_components/SettingsCheckbox'

export const Sfx = () => {
    const isSfxOpen = useSoundSettings((s) => s.sfx)
    const toggleSfx = useSoundSettings((s) => s.toggleSfx)

    return (
        <SettingsCheckbox name="Sfx" isChecked={isSfxOpen} onMouseDown={toggleSfx} />
    )
}