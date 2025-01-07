'use client'

import { useEffectOnce } from '@/hooks/useEffectOnce'
import { useTabs } from '@/zustand/store'
import { useEffect, type PropsWithChildren } from 'react'

export const Tabs = ({ children }: PropsWithChildren) => {
    const newTab = useTabs((s) => s.newTab)
    const closeTab = useTabs((s) => s.closeTab)
    const tabIDs = useTabs((s) => s.tabIDs)
    const myTabID = useTabs((s) => s.tabID)
    const setMusicPlayerTabID = useTabs(s => s.setMusicPlayerTabID)
    const isMusicPlayerStays = useTabs((s) => s.musicPlayerStayOpen)

    useEffect(() => {
        if (!myTabID) return
        if (!isMusicPlayerStays) setMusicPlayerTabID(tabIDs[tabIDs.length - 1]!)
    }, [tabIDs, myTabID])

    const beforeUnload = (e: BeforeUnloadEvent) => {
        closeTab()
    }

    console.log('tabs: ', useTabs.getState())

    useEffectOnce(() => {
        newTab()
        window.addEventListener('beforeunload', beforeUnload)

        return () => {
            window.removeEventListener('beforeunload', beforeUnload)
        }
    })

    return children
}