"use client"

import { useShortcut } from '@/hooks'
import { switchModalAtom } from './BtnOptions/atoms'
import { useSetAtom } from 'jotai'
import { useGameToolAlert } from '@/zustand/store'
import { useRef } from 'react'

export const BtnOptionsShortcut = () => {
    const isLoaded = useRef<boolean>(false)
    const switchModal = useSetAtom(switchModalAtom)

    useShortcut({
        keyName: 'Escape',
        onShortcut: () => {
            console.log('shortcut')
            if (!isLoaded.current) {
                useGameToolAlert.getState().setAlert('Options Loading...')
                isLoaded.current = true
            }

            switchModal()
        }
    })

    return null
}