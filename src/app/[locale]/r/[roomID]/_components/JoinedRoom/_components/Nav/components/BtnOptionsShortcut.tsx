'use client'

import { useShortcut } from '@/hooks'
import { switchModalAtom } from './BtnOptions/atoms'
import { useSetAtom } from 'jotai'
import { useCurrentPanel, useGameToolAlert } from '@/zustand/store'
import { useRef } from 'react'

export const BtnOptionsShortcut = ({ alertText }: Props) => {
    const isLoaded = useRef<boolean>(false)
    const switchModal = useSetAtom(switchModalAtom)
    const currentPanel = useCurrentPanel(s => s.currentPanel)
    const setCurrentPanel = useCurrentPanel(s => s.setPanel)

    useShortcut({
        keyName: 'Escape',
        onShortcut: () => {
            if (currentPanel !== null) {
                setCurrentPanel(null)
                return
            }

            if (!isLoaded.current) {
                useGameToolAlert.getState().setAlert(alertText)
                isLoaded.current = true
            }

            switchModal()
        }
    })

    return null
}

type Props = {
    alertText: string
}