"use client"

import { useSoundSettings } from '@/zustand/store'
import { SettingsCheckbox } from '../../_components/SettingsCheckbox'

export const Music = ({ description, title }: Props) => {
    const isMusicOpen = useSoundSettings((s) => s.music)
    const toggleMusic = useSoundSettings((s) => s.toggleMusic)

    return (
        <SettingsCheckbox name={title} description={description} isChecked={isMusicOpen} onMouseDown={toggleMusic} />
    )
}

type Props = {
    title: string
    description: string
}