"use client"

import { UseShortcut } from '@/components/UseShortcut'
import { useSetAtom } from 'jotai'
import { Fragment } from 'react'
import { refreshAlertAtom } from '../atoms'

export const DefaultShortcuts = () => {
    const setRefreshAlert = useSetAtom(refreshAlertAtom)

    return <Fragment>
        <UseShortcut keyName="Refresh" onShortcut={() => {

            setRefreshAlert(true)
            window.location.reload()
        }} />

    </Fragment>
}