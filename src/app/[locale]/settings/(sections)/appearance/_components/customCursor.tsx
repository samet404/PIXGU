"use client"

import { useCustomCursor } from '@/zustand/store'
import { SettingsCheckbox } from '../../_components/SettingsCheckbox'

export const CustomCursor = ({ name, description }: Props) => {
    const isOpen = useCustomCursor((s) => s.isOpen)
    const switchSettings = useCustomCursor((s) => s.switch)

    return (
        <SettingsCheckbox
            onMouseDown={switchSettings}
            name={name}
            description={description}
            isChecked={isOpen}
        />
    )
}

type Props = {
    name: string
    description: string
}
