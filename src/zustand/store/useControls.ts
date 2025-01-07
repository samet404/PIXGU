import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { persistNSync } from "persist-and-sync";
import { arrsEqual } from '@/utils';
import { MODIFIER_KEYS } from '@/constants';

const initState: State = {
    combination: [],
    keys: {
        Pencil: ['W'],
        Bucket: ['A'],
        Eyedropper: ['S'],
        Eraser: ['E'],
        Powerups: ['U'],
        Download: ['D'],
        Trash: ['BACKSPACE'],
        "Decrease tool size": ['-'],
        "Increase tool size": ['+'],
        Grid: ['G'],
        Marketplace: ['M'],
        Escape: ['ESCAPE'],
        Refresh: ['CONTROL', 'R'],
        Undo: ['CONTROL', 'Z'],
        Redo: ['CONTROL', 'Y'],
        "Change Undo/Redo type": ['CONTROL', 'SHIFT', 'V'],
        "Change in-game chat": ['CONTROL', 'C'],
        "Toggle In-Game Logs": ['CONTROL', 'SHIFT', 'J']
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
                clearOneCombinationKey: (key) => {
                    set({
                        ...get(),
                        combination: get().combination.filter(k => k !== key)
                    })
                    console.log('clearOneCombinationKey: ', get().combination)
                },
                addToCombination: (key) =>
                    set({
                        ...get(),
                        combination: [...get().combination, key]
                    }),

                clearCombinationExceptModifiers: () =>
                    set({
                        ...get(),
                        combination: get().combination.filter(key => !MODIFIER_KEYS.has(key))
                    }),

                setSameCombination: () => set({
                    ...get(),
                    combination: [...get().combination]
                }),

                clearCombination: () => {
                    console.log('clearCombination')
                    set({
                        ...get(),
                        combination: []
                    })
                }
            }),
            { name: 'controls', exclude: ['combination'] },
        ),
    ),
)

type State = {
    combination: string[]
    keys: Record<'Pencil' | 'Bucket' | 'Eyedropper' | 'Powerups' | 'Marketplace' | 'Escape' | 'Grid' | 'Increase tool size' | 'Decrease tool size' | 'Eraser' | 'Trash' | 'Download' | 'Refresh' | 'Undo' | 'Redo' | 'Change Undo/Redo type' | 'Change in-game chat' | 'Toggle In-Game Logs', Key>
}

export type ControlsState = State

type Action = {
    setKey: (key: string, value: string[]) => {
        type: 'warning' | 'error'
        text: string
    } | void
    getKeys: () => string[]
    getKeyValue: (key: keyof State['keys']) => string[]
    addToCombination: (key: string) => void
    setSameCombination: () => void
    clearOneCombinationKey: (key: string) => void
    clearCombinationExceptModifiers: () => void
    clearCombination: () => void
}

type Key = [string] | [string, string] | [string, string, string]
