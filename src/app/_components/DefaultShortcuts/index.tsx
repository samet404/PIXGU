'use client'

import { useShortcut } from '@/hooks/useShortcut'

export const DefaultShortcuts = () => {
    useShortcut({
        keyName: "Refresh", onShortcut: () => {
            window.location.reload()
        }
    })
    return null
}