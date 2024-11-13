'use client'

import { useTabs } from '@/zustand/store'
import { Minimized } from './components/Minimized'
import { MinimizedPlayer } from './components/MinimizedPlayer'
import { Player } from './components/Player'
import { Fragment } from 'react'

export const Content = () => {
    const musicPlayerTabID = useTabs(s => s.musicPlayerTabID)
    const tabID = useTabs(s => s.tabID)

    if (tabID === musicPlayerTabID) return <Fragment>
        <MinimizedPlayer>
            <Player />
        </MinimizedPlayer>
        <Minimized />
    </Fragment>
}
