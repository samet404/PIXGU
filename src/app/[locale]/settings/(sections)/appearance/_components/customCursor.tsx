"use client"

import { useCustomCursor } from '@/zustand/store'
import { SettingsCheckbox } from '../../_components/SettingsCheckbox'

export const CustomCursor = () => {
    const isOpen = useCustomCursor((s) => s.isOpen)
    const switchSettings = useCustomCursor((s) => s.switch)

    return (
        <SettingsCheckbox
            onMouseDown={switchSettings}
            name="Custom cursor"
            description="A little circle follows your mouse cursor. Can cause performance issues little bit."
            isChecked={isOpen}
        />
    )
}