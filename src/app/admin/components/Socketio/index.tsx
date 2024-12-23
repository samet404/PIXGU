"use client"

import { useAtomValue } from 'jotai'
import { ChangeWsUrl } from './components/ChangeWsUrl'
import { Providers } from './components/Providers'
import { WsUrl } from './components/WsUrl'
import { selectedPanelAtom } from '../../atom'
import { SendEvent } from './components/SendEvent'

export const Socketio = () => {
    const selectedPanel = useAtomValue(selectedPanelAtom)

    if (selectedPanel === 'socket') return (
        <div className='flex flex-col'>
            <WsUrl />
            <ChangeWsUrl />
            <Providers>
                <div className='flex flex-row'>
                    <SendEvent event='set-last-version' />
                    <SendEvent event='version-changed' />
                    <SendEvent event='prepare-restart' />
                    <SendEvent event='flushall-except-users' />
                    <SendEvent event='flushall' danger />
                </div>
            </Providers>
        </div>
    )
}