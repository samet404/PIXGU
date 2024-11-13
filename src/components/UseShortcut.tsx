import { arrsEqual } from '@/utils'
import { useControls, type ControlsState } from '@/zustand/store'
import { useEffect, useRef } from 'react'

export const UseShortcut = ({ keyName, onShortcut }: Props) => {
    const queue = useControls(s => s.queue)
    const keyValue = useControls(s => s.keys[keyName])
    const rightOrder = useRef<boolean | null>(null)
    const shortcutFired = useRef<boolean>(false)

    useEffect(() => {
        if (queue.length === 0) {
            rightOrder.current = null
            shortcutFired.current = false
            return
        }

        if (rightOrder.current === false || shortcutFired.current) return

        if (arrsEqual(queue, keyValue)) {
            onShortcut()
            shortcutFired.current = true
            return
        }

        if (arrsEqual(queue, keyValue.slice(0, queue.length)))
            rightOrder.current = true
        else
            rightOrder.current = false

        return () => {
            rightOrder.current = null
            shortcutFired.current = false
        }
    }, [queue, keyValue])


    return null
}


type Props = {
    keyName: keyof ControlsState['keys']
    onShortcut: () => void
}