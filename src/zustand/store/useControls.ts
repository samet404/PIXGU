import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { persistNSync } from "persist-and-sync";
import { arrsEqual } from '@/utils';

const initState: State = {
    queue: [],
    keys: {
        Pencil: ['P'],
        Bucket: ['B'],
        Eyedropper: ['E'],
        Eraser: ['X'],
        Powerups: ['U'],
        Download: ['D'],
        Trash: ['BACKSPACE'],
        "Decrease tool size": ['-'],
        "Increase tool size": ['+'],
        Grid: ['G'],
        Marketplace: ['M'],
        Escape: ['ESCAPE'],
        Refresh: ['CONTROL', 'R'],
    }
}

export const useControls = create<State & Action>()(
    subscribeWithSelector(
        persistNSync<State & Action>(
            (set, get) => ({
                ...initState,

                setKey: (key, value) => {
                    const values = Object.values(get().keys)


                    set({
                        keys: {
                            ...get().keys,
                            [key]: value,
                        },
                    })

                    if (values.some(innerArr => arrsEqual(innerArr, value))) return {
                        type: 'warning',
                        text: 'This key is already in use!'
                    }
                },

                getKeys: () => Object.keys(get().keys),
                getKeyValue: (key) => get().keys[key],
                addToQueue: (key) => {
                    console.log('adding to queue', key)
                    set({
                        ...get(),
                        queue: [...get().queue, key]
                    })
                },

                clearQueue: () => set({
                    ...get(),
                    queue: []
                })
            }),
            { name: 'controls' },
        ),
    ),
)

type State = {
    queue: string[]
    keys: Record<'Pencil' | 'Bucket' | 'Eyedropper' | 'Powerups' | 'Marketplace' | 'Escape' | 'Grid' | 'Increase tool size' | 'Decrease tool size' | 'Eraser' | 'Trash' | 'Download' | 'Refresh', Key>
}

export type ControlsState = State

type Action = {
    setKey: (key: string, value: string[]) => {
        type: 'warning' | 'error'
        text: string
    } | void
    getKeys: () => string[]
    getKeyValue: (key: keyof State['keys']) => string[]
    addToQueue: (keyy: string) => void
    clearQueue: () => void
}

type Key = [string] | [string, string] | [string, string, string]
