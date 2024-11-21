
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { syncTabs } from 'zustand-sync-tabs';

const initState: State = {
    tabID: null,
    tabIDs: [],
    currentTabCount: null,
    openedTabCount: 0,
    musicPlayerStayOpen: false,
    musicPlayerTabID: null
}

export const useTabs = create<State & Action>()(
    subscribeWithSelector(
        syncTabs<State & Action>(
            (set, get) => ({
                ...initState,

                newTab: () => {
                    const currentTabCount = (get().currentTabCount ?? 0) + 1
                    const openedTabCount = (get().openedTabCount ?? 0) + 1
                    const tabID = openedTabCount

                    set({
                        ...get(),
                        tabID,
                        openedTabCount,
                        currentTabCount,
                        tabIDs: [...get().tabIDs, tabID]
                    })

                    return tabID
                },
                closeTab: () => {
                    set({
                        ...get(),
                        currentTabCount: (get().currentTabCount ?? 0) - 1,
                        tabIDs: get().tabIDs.filter((ID) => ID !== get().tabID)
                    })
                },

                setMusicPlayerTabID: (ID) => {
                    set({
                        ...get(),
                        musicPlayerTabID: ID
                    })
                    console.log('setMusicPlayerTabID: ', ID)
                },

                reset: () =>
                    set({
                        ...initState,
                    }),

                setMusicPlayerStayOpen: (isStayOpen) => {
                    set({
                        ...get(),
                        musicPlayerStayOpen: isStayOpen
                    })
                }
            }),
            { name: 'controls', exclude: ['tabID', 'musicPlayerTabID'] },
        ),
    ),
)

type State = {
    tabID: number | null
    tabIDs: number[]
    musicPlayerStayOpen: boolean
    musicPlayerTabID: number | null
    currentTabCount: number | null
    openedTabCount: number
}

type Action = {
    newTab: () => number
    setMusicPlayerTabID: (ID: number | null) => void
    setMusicPlayerStayOpen: (isStayOpen: boolean) => void
    closeTab: () => void
    reset: () => void
}

