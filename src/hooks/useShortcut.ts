"use client"

import { arrsEqual } from '@/utils'
import { useControls, type ControlsState } from '@/zustand/store/useControls'
import { useEffect } from 'react'

export const useShortcut = ({ keyName, onShortcut }: Args) => {
    const combination = useControls(s => s.combination)
    const keyValue = useControls(s => s.keys[keyName])

    useEffect(() => {
        if (arrsEqual(combination, keyValue)) onShortcut()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [combination, keyValue])
}


type Args = {
    keyName: keyof ControlsState['keys']
    onShortcut: () => void
}